import { Exclude, Expose } from 'class-transformer';
import { UserRole } from '@prisma/client';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;
  
  @Expose()
  shopId: number;

  @Exclude()
  password?: string;
}
