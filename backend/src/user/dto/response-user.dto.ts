import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '@prisma/client';

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
