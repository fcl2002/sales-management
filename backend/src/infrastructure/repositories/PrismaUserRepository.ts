import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { IUserRepository } from '../../core/ports/IUserRepository';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UpdateUserDto } from '../../user/dto/update-user.dto';
import { UserResponseDto } from '../../user/dto/response-user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.prisma.user.create({
      data: createUserDto,
      select: { id: true, name: true, email: true, role: true, shopId: true },
    });
    return plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true });
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
    });
    return users.map(user => plainToInstance(UserResponseDto, user, { excludeExtraneousValues: true }));
  }

  async findOne(id: number): Promise<UserResponseDto | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findEmail(email: string): Promise<UserResponseDto | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return plainToInstance(UserResponseDto, updatedUser, { excludeExtraneousValues: true });
  }

  async remove(id: number): Promise<UserResponseDto> {
    const deletedUser = await this.prisma.user.delete({ where: { id } });
    return plainToInstance(UserResponseDto, deletedUser, { excludeExtraneousValues: true });
  }
}
