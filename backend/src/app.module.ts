import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ProductModule } from './product/product.module';
import { ShopModule } from './shop/shop.module';
import { GenericValidator } from './common/validators/generic-validator';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
    PrismaModule, 
    AuthModule, 
    UserModule, 
    ShopModule,
    ProductModule, 
  ],
  providers: [
    AppService, 
    PrismaService,
    GenericValidator,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  controllers: [AppController]
})
export class AppModule {}
