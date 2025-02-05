import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'E-mail inválido' })
  email?: string;

  /* Possíveis próximos passos para atualização de dados do usuário
  - atualização de senha com 'Esqueceu a senha?'
  */
}
