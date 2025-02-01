// import { ConfigType } from '@nestjs/config';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { JwtPayload } from '../types/jwtPayload';
// import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
// import refreshJwtConfig from '../config/refresh-jwt.config';
// import { Request } from 'express';
// import { AuthService } from '../auth.service';

// @Injectable()
// export class RefreshJwtStrategy extends PassportStrategy(
//   Strategy,
//   'refresh-jwt',
// ) {
//   constructor(
//     @Inject(refreshJwtConfig.KEY)
//     private refreshJwtConfiguration: ConfigType<typeof refreshJwtConfig>,
//     private authService: AuthService,
//   ) {
//     super({
//       jwtFromRequest: (request: Request) => {
//         const authHeader = request?.headers?.authorization;

//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//           throw new UnauthorizedException('Refresh token not found in header');
//         }

//         return authHeader.replace('Bearer ', '').trim();
//       },
//       secretOrKey: refreshJwtConfiguration.secret as string,
//       ignoreExpiration: false,
//       passReqToCallback: true,
//     });
//   }

  // validate(request: Request, payload: JwtPayload) {
  //   const authHeader = request.get('authorization');
  
  //   if (!authHeader) {
  //     throw new UnauthorizedException('Authorization header is missing');
  //   }
  
  //   const refreshToken = authHeader.replace('Bearer', '').trim();
  //   const userId = payload.sub;
  
  //   return this.authService.validateRefreshToken(userId, refreshToken);
  // }
// }