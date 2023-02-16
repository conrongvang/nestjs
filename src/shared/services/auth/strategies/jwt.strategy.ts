import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Const } from '../../../consts';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      jsonWebTokenOptions: { ignoreExpiration: false, ignoreNotBefore: true },
      secretOrKey: Const.JWT_SECRET_PHRASE,
    });
  }

  async validate(payload: any) {
    return { sub: payload.sub, user: payload.user, claims: payload.claims };
  }
}
