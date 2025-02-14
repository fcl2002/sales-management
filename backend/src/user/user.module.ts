import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaUserRepository } from '../infrastructure/repositories/PrismaUserRepository';
import { IUserRepository } from '../core/ports/user/IUserRepository';
import { IUserValidator } from 'src/core/ports/user/IUserValidator';
import { UserValidator } from '../common/validators/user-validator';
import { GenericValidator } from 'src/common/validators/generic-validator';
import { ShopModule } from 'src/shop/shop.module';
import { IUserService } from 'src/core/ports/user/IUserService';

@Module({
  imports: [ShopModule],
  controllers: [UserController],
  providers: [
    GenericValidator,
    { provide: IUserRepository, useClass: PrismaUserRepository },
    { provide: IUserValidator, useClass: UserValidator },
    { provide: IUserService, useClass: UserService },
  ],
  exports: [IUserService],
})
export class UserModule {}
