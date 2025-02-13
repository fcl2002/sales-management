import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaUserRepository } from '../infrastructure/repositories/PrismaUserRepository';
import { IUserRepository } from '../core/ports/IUserRepository';
import { IUserValidator } from 'src/core/ports/IUserValidator';
import { UserValidator } from '../common/validators/user-validator';
import { GenericValidator } from 'src/common/validators/generic-validator';
import { ShopModule } from 'src/shop/shop.module';
import { IUserService } from 'src/core/ports/IUserService';

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
