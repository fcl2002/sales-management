import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from './types/jwtPayload';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    
    if (!user)
      throw new UnauthorizedException('User not found!');

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');
    
    return { id: user.id, role: user.role };
  }

  async login(userId: number) {
    const payload: JwtPayload = { sub: userId };
    
    return {
      user_id: userId,
      acess_token: this.jwtService.sign(payload)
    };
  }
}
