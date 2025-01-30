import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './types/jwtPayload';
import { UserService } from 'src/user/user.service';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    
    if (!user)
      throw new UnauthorizedException('User not found!');

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');
    
    return { id: user.id, role: user.role };
  }

  async login(userId: number) {
    const { access_token, refresh_token } = await this.generateTokens(userId);
    const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);

    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    return { user_id: userId, access_token, refresh_token };
  }

  async generateTokens(userId: number) {
    const payload: JwtPayload = { sub: userId };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return { access_token, refresh_token };
  }

  async refreshToken(userId: number) {
    const { access_token, refresh_token } = await this.generateTokens(userId);

    const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken);
    
    return {
      id: userId,
      access_token,
      refresh_token,
    };
  }

  async validateRefreshToken(userId: number, refresh_token: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.hashedRefreshToken)
      throw new UnauthorizedException('Invalid Refresh Token');

    const refreshTokenMatches = await bcrypt.compare(refresh_token, user.hashedRefreshToken);
    if (!refreshTokenMatches)
      throw new UnauthorizedException('Invalid Refresh Token');

    return { id: userId };
  }
}
