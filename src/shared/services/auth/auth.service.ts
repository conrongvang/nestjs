import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccountService } from '../../../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly accountService: AccountService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.accountService.validateUserLogin(username, pass);

    if (user) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(login: LoginDto) {
    const user = await this.validateUser(login.email, login.password);
    if (!user) {
      throw new UnauthorizedException('User does not exist or credentials provided not valid.');
    }

    const payload = {
      sub: user.id,
      user: user,
      claims: { accountType: user.accountType, role: user.role },
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signOut(req) {}
}
