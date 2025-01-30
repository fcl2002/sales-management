import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from 'src/user/user.module';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import refreshJwtConfig from './config/refresh-jwt.config';
import { RefreshJwtGuard } from './guards/refresh-jwt.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService, 
    PrismaService, 
    JwtStrategy,
    LocalStrategy,
    RefreshJwtStrategy,
    RefreshJwtGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
