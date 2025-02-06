import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserValidator } from './utils/user-validator';
import { ShopService } from 'src/shop/shop.service';
import { ShopModule } from 'src/shop/shop.module';

@Module({
  imports: [
    ShopModule,
  ],
  controllers: [UserController],
  providers: [
    UserService, 
    PrismaService, 
    UserValidator, 
    ShopService],
  exports: [UserService],
})
export class UserModule {}
