import { CreateUserDto } from "src/user/dto/create-user.dto";
import { UserResponseDto } from "src/user/dto/response-user.dto";
import { UpdateUserDto } from "src/user/dto/update-user.dto";

export const IUserService = Symbol('IUserService');

export interface IUserService {
    create(createUserDto: CreateUserDto): Promise<UserResponseDto>;
    findAll(): Promise<UserResponseDto[]>;
    findOne(id: number): Promise<any>;
    findEmail(email: string): Promise<any>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<UserResponseDto>;
    remove(id: number): Promise<UserResponseDto>;
}