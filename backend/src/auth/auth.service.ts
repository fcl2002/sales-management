import { Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './types/jwtPayload';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserRole } from './enums/roles.enum';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async login(loginDto: LoginDto): Promise<{ id: number; access_token: string }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role as UserRole  }
    
    return {
      id: user.id,
      access_token: await this.jwtService.signAsync(payload)
    };
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findEmail(email);

    if(!user) {
      this.logger.log('[UserService} User not found!');
      throw new UnauthorizedException('Invalid credencials!1');
    }
    
    const isPasswordMatch = await bcrypt.compare(pass, user.password);
    if(isPasswordMatch){
      this.logger.log(`[UserService} Password doesn't match!`);
      throw new UnauthorizedException('Invalid credencials!2');
    }

    const { password, hashedRefreshToken, ...result} = user;
    return result;
  }

  // async login(userId: number) {
  //   const { access_token, refresh_token } = await this.generateTokens(userId);
  //   const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);

  //   await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
  //   return { user_id: userId, access_token, refresh_token };
  // }

  // async generateTokens(userId: number) {
  //   const payload: JwtPayload = { sub: userId, role: user.role };
  //   const [access_token, refresh_token] = await Promise.all([
  //     this.jwtService.signAsync(payload),
  //     this.jwtService.signAsync(payload, this.refreshTokenConfig),
  //   ]);

  //   return { access_token, refresh_token };
  // }

  // async refreshToken(userId: number) {
  //   const { access_token, refresh_token } = await this.generateTokens(userId);

  //   const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
  //   await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    
  //   return {
  //     id: userId,
  //     access_token,
  //     refresh_token,
  //   };
  // }

  // async validateRefreshToken(userId: number, refresh_token: string) {
  //   const user = await this.userService.findOne(userId);
  //   if (!user || !user.hashedRefreshToken)
  //     throw new UnauthorizedException('Invalid Refresh Token');

  //   const refreshTokenMatches = await bcrypt.compare(refresh_token, user.hashedRefreshToken);
  //   if (!refreshTokenMatches)
  //     throw new UnauthorizedException('Invalid Refresh Token');

  //   return { id: userId };
  // }
}
