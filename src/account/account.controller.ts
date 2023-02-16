import { Body, Controller, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiBadRequestResponse, ApiConflictResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppBaseController } from '../app-base.controller';
import { Public } from '../shared/services/auth/decorator/public.decorator';
import { UserDto } from '../shared/dto/user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from '../shared/services/auth/decorator/user.decorator';
import { ValidateOtpRequestDto } from './dto/validate-otp-request.dto';
import { Roles } from '../shared/services/auth/decorator/role.decorator';
import { RolesEnum } from '../shared/consts/roles.enum';

@Controller({ path: 'account', version: '1' })
@ApiTags('Account')
export class AccountController extends AppBaseController {
  constructor(private readonly accountService: AccountService) {
    super();
  }

  @Public()
  @Post()
  @ApiOkResponse({ description: 'Created new user successful' })
  @ApiBadRequestResponse({
    description: 'Validation failed while validating incoming resources',
  })
  @ApiConflictResponse({
    description: 'Return 409 - Conflict response when already existing one record with same username',
  })
  @ApiOperation({ summary: 'Create account for user' })
  async createAccount(@Body() userDto: UserDto) {
    return await this.accountService.createAccount(userDto);
  }

  @Public()
  @Post('reset-password')
  @ApiOkResponse({})
  @ApiOperation({
    summary: 'Request to reset password for account associated with requested email',
  })
  async resetPasswordStep1(@Body() { email }: { email: string }) {
    return await this.accountService.resetPassword(email);
  }

  @Public()
  @Post('reset-password/otp')
  @ApiOperation({
    summary: 'Validate reset action by OTP sent to email address',
  })
  @ApiOkResponse({
    description: 'Return true if OTP entered by user is valid, else then false.',
  })
  async resetPasswordStep2(@Body() reqDto: ValidateOtpRequestDto) {
    return await this.accountService.resetPasswordVerifyOTP(reqDto);
  }

  @Public()
  @Post('reset-password/new-password')
  @ApiOperation({ summary: 'Reset password this new password' })
  @ApiOkResponse({ description: '' })
  async resetPasswordStep3(@Body() reqDto: ResetPasswordDto) {
    return await this.accountService.resetPasswordToNewPassword(reqDto);
  }

  @Post('change-password/')
  @ApiOperation({ summary: 'Change password for authenticated user.' })
  @ApiOkResponse({})
  async changePassword(@User() user: UserDto, @Body() changePasswordDto: ChangePasswordDto) {
    return await this.accountService.changePassword(user, changePasswordDto);
  }

  @Post('/reset-user-account')
  @ApiOperation({ summary: 'Reset all account for testing' })
  @ApiOkResponse({})
  @Roles([RolesEnum.Admin])
  async resetUserAccount() {
    return await this.accountService.resetUserAccount();
  }
}
