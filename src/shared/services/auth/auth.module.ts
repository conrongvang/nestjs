import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountModule } from '../../../account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Const } from '../../consts';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { RolesGuard } from './guard/roles.guard';

@Module({
  imports: [
    forwardRef(() => AccountModule),
    PassportModule,
    JwtModule.register({
      secret: Const.JWT_SECRET_PHRASE,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
