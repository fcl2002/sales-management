import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { IUserRepository } from '../core/ports/user/IUserRepository';
import { IUserValidator } from '../core/ports/user/IUserValidator';
import { IShopService } from '../core/ports/shop/IShopService';
import { UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';

jest.mock('bcrypt', () => ({
    hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

describe('UserService', () => {
  let userService: UserService;
  let userRepositoryMock: Partial<IUserRepository>;
  let userValidatorMock: Partial<IUserValidator>;
  let shopServiceMock: Partial<IShopService>;

  beforeEach(async () => {
    userRepositoryMock = {
      create: jest.fn().mockImplementation(async (user) => ({
        ...user,
        id: Math.floor(Math.random() * 1000),
      })),
      findAll: jest.fn().mockResolvedValue([
        { id: 1, email: 'admin@example.com', role: UserRole.ADMIN },
        { id: 2, email: 'user@example.com', role: UserRole.USER },
      ]),
      findEmail: jest.fn().mockImplementation(async (email) =>
        email === 'user@example.com'
          ? { id: 2, email: 'user@example.com', password: 'hashedPassword' }
          : null
      ),
      update: jest.fn().mockImplementation((id, updateUserDto) => ({
        id,
        ...updateUserDto,
      })),
      remove: jest.fn().mockResolvedValue(true),
    };

    userValidatorMock = {
      validateEmailNotExists: jest.fn(),
      validateUserExists: jest.fn().mockImplementation(async (id) => {
        if (id !== 1 && id !== 2) throw new NotFoundException('Usuário não encontrado.');
        return { id, email: 'test@example.com' };
      }),
    };

    shopServiceMock = {
      createShopForUser: jest.fn().mockResolvedValue({ id: 100, name: 'Shop Test' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: IUserRepository, useValue: userRepositoryMock },
        { provide: IUserValidator, useValue: userValidatorMock },
        { provide: IShopService, useValue: shopServiceMock },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('Deve ser definido', () => {
    expect(userService).toBeDefined();
  });

  describe('Criar Usuário', () => {
    it('Deve criar um usuário ADMIN sem loja', async () => {
      const userDto = { name: "Fernando", email: 'admin@example.com', password: '12345678', role: UserRole.ADMIN };

      const result = await userService.create(userDto);

      expect(userValidatorMock.validateEmailNotExists).toHaveBeenCalledWith(userDto.email);
      expect(bcrypt.hash).toHaveBeenCalledWith(userDto.password, 10);
      expect(userRepositoryMock.create).toHaveBeenCalledWith(expect.objectContaining({ email: userDto.email }));
      expect(result).toHaveProperty('id');
    });

    it('Deve criar um usuário USER e vincular a um Shop', async () => {
      const userDto = { email: 'user@example.com', password: '123456', role: UserRole.USER, name: 'Test User' };

      const result = await userService.create(userDto);

      expect(shopServiceMock.createShopForUser).toHaveBeenCalledWith(userDto.name);
      expect(result.shopId).toBe(100);
    });
  });

  describe('Buscar Usuário', () => {
    it('Deve retornar todos os usuários', async () => {
      const result = await userService.findAll();
      expect(result.length).toBe(2);
    });

    it('Deve retornar um usuário pelo ID', async () => {
      const result = await userService.findOne(1);
      expect(result.id).toBe(1);
    });

    it('Deve lançar NotFoundException se o ID não existir', async () => {
      await expect(userService.findOne(99)).rejects.toThrow(NotFoundException);
    });

    it('Deve retornar um usuário pelo email', async () => {
      const result = await userService.findEmail('user@example.com');
      expect(result).not.toBeNull();
      expect(result!.email).toBe('user@example.com');
    });

    it('Deve retornar null se o email não existir', async () => {
      const result = await userService.findEmail('notfound@example.com');
      expect(result).toBeNull();
    });
  });

  describe('Atualizar Usuário', () => {
    it('Deve atualizar um usuário existente', async () => {
      const updateUserDto = { email: 'updated@example.com' };
      const result = await userService.update(1, updateUserDto);

      expect(userValidatorMock.validateUserExists).toHaveBeenCalledWith(1);
      expect(userValidatorMock.validateEmailNotExists).toHaveBeenCalledWith(updateUserDto.email, 1);
      expect(result.email).toBe(updateUserDto.email);
    });
  });

  describe('Remover Usuário', () => {
    it('Deve remover um usuário existente', async () => {
      const result = await userService.remove(1);

      expect(userValidatorMock.validateUserExists).toHaveBeenCalledWith(1);
      expect(userRepositoryMock.remove).toHaveBeenCalledWith(1);
      expect(result).toBe(true);
    });

    it('Deve lançar NotFoundException se o usuário não existir', async () => {
      await expect(userService.remove(99)).rejects.toThrow(NotFoundException);
    });
  });
});
