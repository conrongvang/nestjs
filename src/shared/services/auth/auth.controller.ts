import { Body, Controller, Post, Req } from '@nestjs/common';
import { Public } from './decorator/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller({ path: 'auth', version: '1' })
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Authenticate user with username and password' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('signout')
  @ApiOperation({
    summary: 'Sign-out current session of user by revoke jwt token',
  })
  async signOut(@Req() req) {
    await this.authService.signOut(req);
  }
}
