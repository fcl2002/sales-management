import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/response-user.dto';
import { UserRole } from '@prisma/client';
import { IUserRepository } from 'src/core/ports/IUserRepository';
import { IUserValidator } from 'src/core/ports/IUserValidator';
import { IShopService } from 'src/core/ports/IShopService';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  
  constructor(
    @Inject(IUserRepository) 
    private readonly userRepository: IUserRepository,
    @Inject(IUserValidator)  
    private readonly userValidator: IUserValidator,
    @Inject(IShopService)    
    private readonly shopService: IShopService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    this.logger.log('[UserService] Criando um novo usuário...');
    await this.userValidator.validateEmailNotExists(createUserDto.email);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    let shopId: number | null = null;
    if (createUserDto.role === UserRole.USER) {
      const shop = await this.shopService.createShopForUser(createUserDto.name);
      shopId = shop.id;
    }

    return this.userRepository.create({  ...createUserDto,  password: hashedPassword, shopId });
  }

  async findAll(): Promise<UserResponseDto[]> {
    this.logger.log('[UserService] Buscando todos os usuários.');
    return await this.userRepository.findAll();
  }

  async findOne(id: number) {
    this.logger.log(`[UserService] Buscando usuário com ID ${id}`);
    return await this.userValidator.validateUserExists(id);
  }

  async findEmail(email: string) {
    return await this.userRepository.findEmail(email);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    this.logger.log(`[UserService] Atualizando usuário com ID ${id}`);
    await this.userValidator.validateUserExists(id);

    if (updateUserDto.email) {
      await this.userValidator.validateEmailNotExists(updateUserDto.email, id);
    }

    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: number): Promise<UserResponseDto> {
    this.logger.log(`[UserService] Removendo usuário com ID ${id}`);
    await this.userValidator.validateUserExists(id);
    return this.userRepository.remove(id);
  }
}
