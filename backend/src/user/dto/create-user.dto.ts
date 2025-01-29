import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../auth/enums/roles.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @IsEmail({}, { message: 'O email deve ser válido.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres.' })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  password: string;

  @IsEnum(Role, { message: 'O papel do usuário deve ser "user" ou "admin".' })
  @IsOptional() // Opcional, assume "user" como padrão
  role?: Role;
}
