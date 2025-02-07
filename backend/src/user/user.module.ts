import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaUserRepository } from '../infrastructure/repositories/PrismaUserRepository';
import { IUserRepository } from '../core/ports/IUserRepository';
import { IShopService } from '../core/ports/IShopService';
import { IUserValidator } from 'src/core/ports/IUserValidator';
import { UserValidator } from './utils/user-validator';
import { ShopService } from 'src/shop/shop.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    { provide: IUserRepository, useClass: PrismaUserRepository },
    { provide: IUserValidator, useClass: UserValidator },
    { provide: IShopService, useClass: ShopService },
  ],
  exports: [UserService],
})
export class UserModule {}
