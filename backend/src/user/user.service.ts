import { ConflictException, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/response-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    this.logger.log('[UserService] Criando um novo usuário...')
    
    const { password, name, email } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);

    const emailExists = await this.prisma.user.findUnique({ where: { email }});
    if (emailExists) {
      this.logger.warn(`[UserService] Tentativa de criar usuário com email já existente: ${email}`);
      throw new ConflictException('Este email já está em uso!');
    }

    const user = await this.prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    this.logger.log(`[UserService] Usuário criado com sucesso: ID ${user.id}`);
    return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
  }

  async findOne(id: number): Promise<UserResponseDto> {
    this.logger.log(`[UserService] Buscando usuário com ID ${id}`);

    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) {
      this.logger.warn(`[UserService] Usuário com ID ${id} não encontrado.`);
      throw new NotFoundException('Usuário não encontrado.');
    }

    return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
  }

  async findAllUsers(): Promise<UserResponseDto[]> {
    this.logger.log('[UserService] Buscando todos os usuários.');

    const users = await this.prisma.user.findMany({
      select: { name: true, email: true, role: true },
    });

    return users.map((user) => plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true }));
  }

  async findUserById(id: number): Promise<UserResponseDto> {
    return this.findOne(id);
  }
  
  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }
  
  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    this.logger.log(`[UserService] Atualizando usuário com ID ${id}`);

    const { name, email } = updateUserDto;

    const userExists = await this.prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      this.logger.warn(`[UserService] Tentativa de atualizar usuário inexistente com ID ${id}`);
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (email) {
      const emailExists = await this.prisma.user.findUnique({ where: { email } });
      if (emailExists && emailExists.id !== id) {
        this.logger.warn(`[UserService] Tentativa de atualizar email para um já existente: ${email}`);
        throw new ConflictException('Este email já está em uso!');
      }
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { name, email },
    });

    this.logger.log(`[UserService] Usuário atualizado com sucesso: ID ${id}`);
    return plainToInstance(UserResponseDto, updatedUser, { excludeExtraneousValues: true });
  }

  async remove(id: number): Promise<UserResponseDto> {
    this.logger.log(`[UserService] Removendo usuário com ID ${id}`);

    const userExists = await this.prisma.user.findUnique({ where: { id } });
    if (!userExists) {
      this.logger.warn(`[UserService] Tentativa de deletar usuário inexistente com ID ${id}`);
      throw new NotFoundException('Usuário não encontrado.');
    }

    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });

    this.logger.log(`[UserService] Usuário removido com sucesso: ID ${id}`);
    return plainToInstance(UserResponseDto, deletedUser, { excludeExtraneousValues: true });
  }
}
