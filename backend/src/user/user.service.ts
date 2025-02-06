import { ConflictException, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/response-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { UserRole } from '@prisma/client';
import { UserValidator } from './utils/user-validator';
import { ShopService } from 'src/shop/shop.service';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly userValidator: UserValidator,
    private readonly shopService: ShopService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    this.logger.log('[UserService] Criando um novo usuário...');

    await this.userValidator.validateEmailNotExists(createUserDto.email);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    let shopId: number | null = null;
    if(createUserDto.role === UserRole.USER) {
      const shop = await this.shopService.createShopForUser(createUserDto.name);
      shopId = shop.id;
    }

    const user = await this.prisma.user.create({
      data: { 
        name: createUserDto.name, 
        email: createUserDto.email, 
        password: hashedPassword, 
        role: createUserDto.role ?? UserRole.USER,
        shopId: shopId
      },
      select: { id: true, name: true, email: true, role: true, shopId: true },
    });

    this.logger.log(`[UserService] Usuário criado com sucesso: ID ${user.id}, Loja ID: ${shopId ?? 'Nenhuma'}`);
    return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
  }

  async findAll(): Promise<UserResponseDto[]> {
    this.logger.log('[UserService] Buscando todos os usuários.');

    const users = await this.prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });

    return users.map((user) => plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true }));
  }

  async findOne(id: number) {
    this.logger.log(`[UserService] Buscando usuário com ID ${id}`);

    const user = await this.userValidator.validateUserExists(id);
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }
  
  async findEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }
  
  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    this.logger.log(`[UserService] Atualizando usuário com ID ${id}`);

    const user = await this.userValidator.validateUserExists(id);

    if(updateUserDto.email) {
      await this.userValidator.validateEmailNotExists(updateUserDto.email, id);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { name: updateUserDto.name, email: updateUserDto.email },
    });

    this.logger.log(`[UserService] Usuário atualizado com sucesso: ID ${id}`);
    return plainToInstance(UserResponseDto, updatedUser, { excludeExtraneousValues: true });
  }

  async remove(id: number): Promise<UserResponseDto> {
    this.logger.log(`[UserService] Removendo usuário com ID ${id}`);

    const user = await this.userValidator.validateUserExists(id);
    
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    this.logger.log(`[UserService] Usuário removido com sucesso: ID ${id}`);
    return plainToInstance(UserResponseDto, deletedUser, { excludeExtraneousValues: true });
  }
}
