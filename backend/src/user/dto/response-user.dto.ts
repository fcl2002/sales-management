import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '../../auth/enums/roles.enum';

export class UserResponseDto {
  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;

  @Exclude()
  password?: string;
}
