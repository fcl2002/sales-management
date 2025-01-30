import { Exclude, Expose } from 'class-transformer';
import { Role } from '../../auth/enums/roles.enum';

export class UserResponseDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: Role;

  @Exclude()
  password?: string;
}
