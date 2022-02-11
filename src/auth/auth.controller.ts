import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createAuthDto: CreateAuthDto): Promise<void> {
    return this.authService.signUp(createAuthDto);
  }

  @Post('/signin')
  signIn(
    @Body() createAuthDto: CreateAuthDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(createAuthDto);
  }
}
