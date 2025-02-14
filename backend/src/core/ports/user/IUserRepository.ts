import { CreateUserDto } from '../../../user/dto/create-user.dto';
import { UpdateUserDto } from '../../../user/dto/update-user.dto';
import { UserResponseDto } from '../../../user/dto/response-user.dto';

export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
  create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
  findAll(): Promise<UserResponseDto[]>;
  findOne(id: number): Promise<UserResponseDto | null>;
  findEmail(email: string): Promise<UserResponseDto | null>;
  update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
  remove(id: number): Promise<UserResponseDto>;
}
