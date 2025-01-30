// import { IsEmail, IsOptional, IsString } from 'class-validator';

// export class UpdateUserDto {
//   @IsOptional()
//   @IsString()
//   name?: string;

//   @IsOptional()
//   @IsEmail({}, { message: 'E-mail inválido' })
//   email?: string;

// }

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
