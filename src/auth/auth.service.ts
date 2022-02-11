import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JtwPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository) private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  signUp(createAuthDto: CreateAuthDto): Promise<void> {
    return this.authRepository.signUp(createAuthDto);
  }

  async signIn(createAuthDto: CreateAuthDto): Promise<{ accessToken: string }> {
    const { userName, password } = createAuthDto;
    const user = await this.authRepository.findOne({ userName });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JtwPayload = { userName };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Please check your user name or password',
      );
    }
  }
}
