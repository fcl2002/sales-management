import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaUserRepository } from '../infrastructure/repositories/PrismaUserRepository';
import { IUserRepository } from '../core/ports/IUserRepository';
import { IUserValidator } from 'src/core/ports/IUserValidator';
import { UserValidator } from '../common/validators/user-validator';
import { GenericValidator } from 'src/common/validators/generic-validator';
import { ShopModule } from 'src/shop/shop.module';

@Module({
  imports: [ShopModule],
  controllers: [UserController],
  providers: [
    UserService,
    GenericValidator,
    { provide: IUserRepository, useClass: PrismaUserRepository },
    { provide: IUserValidator, useClass: UserValidator },
  ],
  exports: [UserService],
})
export class UserModule {}
