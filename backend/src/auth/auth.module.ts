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

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(jwtConfig)],
      inject: [jwtConfig.KEY],
      useFactory: (config) => ({
        secret: config.secret,
        signOptions: {expiresIn: config.signOptions.expiresIn },
      }),
    }),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService, 
    PrismaService, 
    JwtStrategy,
  ],
})
export class AuthModule {}
