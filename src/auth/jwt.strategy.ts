import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthRepository } from './auth.repository';
import { Auth } from './entities/auth.entity';
import { JtwPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthRepository) private authRepository: AuthRepository,
  ) {
    super({
      secretOrKey: 'mySecret0063',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JtwPayload): Promise<Auth> {
    const { userName } = payload;
    const user: Auth = await this.authRepository.findOne({ userName });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
