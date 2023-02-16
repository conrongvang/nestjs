import { MailService } from './../mail/mail.service';
import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UserDto } from '../shared/dto/user.dto';
import { AccountDatabaseService } from '../shared/database/account-database.service';
import { UserEntity } from '../shared/database/entities/users.entity';
import { plainToClass } from 'class-transformer';
import crypto from 'crypto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { RolesEnum } from '../shared/consts/roles.enum';
import { CreateUserDto } from '../shared/dto/create-user.dto';
import { ValidateOtpRequestDto } from './dto/validate-otp-request.dto';
import { BaseService } from '../shared/services/base.service';
import { ResetPasswordService } from './resetPassword.service';

interface PersistedPassword {
  salt: string;
  hash: string;
  // iterations: number;
}

function sleep(timeout) {
  return new Promise((rs) => {
    setTimeout(() => {
      rs(timeout);
    }, timeout);
  });
}

@Injectable()
export class AccountService extends BaseService {
  private readonly PASSWORD_LENGTH = 256;
  private readonly SALT_LENGTH = 64;
  private readonly ITERATIONS = 10000;
  private readonly DIGEST = 'sha256';
  private readonly BYTE_TO_STRING_ENCODING = 'hex'; // this could be base64, for instance

  constructor(
    private readonly accountDbService: AccountDatabaseService,
    private readonly resetPasswordService: ResetPasswordService,
    private readonly mailService: MailService,
  ) {
    super(AccountService.name);
  }

  async resetPassword(email: string) {
    const user = await this.accountDbService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    const token = await this.resetPasswordService.generateToken(user.id);
    try {
      await Promise.race([this.mailService.sendOtp({ to: email, otp: token }), sleep(3000)]);
      return token;
    } catch (error) {
      console.log('🚀 ~ file: account.service.ts:48 ~ AccountService ~ resetPassword ~ error:', error);
      return token;
    }
    // return to test, because send email currently not stable
  }

  async changePassword(user: UserDto, changePasswordDto: ChangePasswordDto) {
    return Promise.resolve(undefined);
  }

  async resetPasswordVerifyOTP(reqDto: ValidateOtpRequestDto): Promise<{ validOtp: boolean; message: string }> {
    const user = await this.accountDbService.findOneByEmail(reqDto.email);
    if (!user) {
      return {
        message: `User with email ${reqDto.email} not found`,
        validOtp: false,
      };
    }
    const isValid = await this.resetPasswordService.verifyToken(user.id, reqDto.otpCode);

    if (!isValid) {
      return { message: `InvalidToken`, validOtp: false };
    }

    return { message: 'Token verified successfully', validOtp: true };
  }

  async resetPasswordToNewPassword({ email, newPassword }: ResetPasswordDto) {
    const user = await this.accountDbService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    const isValid = await this.resetPasswordService.checkOtpForUserValid(user.id);
    if (!isValid) {
      throw new BadRequestException(`Not valid to reset password`);
    }
    const hashPassword = await this.generateHashPassword(newPassword);

    user.salt = hashPassword.salt;
    user.password = hashPassword.hash;

    await this.resetPasswordService.updateChangedPassenger(user.id);

    return (await this.accountDbService.saveAccount(user))?.id;
  }

  async validateUserLogin(email: string, password: string): Promise<UserEntity | null> {
    const user = await this.accountDbService.getUserByEmail(email);

    if (user && (await this.verifyPassword({ salt: user.salt, hash: user.password }, password))) {
      return user;
    } else {
      return null;
    }
  }

  async createAccount(userDto: CreateUserDto) {
    const userEnt = plainToClass(UserEntity, userDto);

    const existingUser = await this.accountDbService.getUserByEmail(userDto.email);

    if (existingUser) {
      throw new ConflictException('Another user has been used this username, please use another username.');
    }

    const hashPassword = await this.generateHashPassword(userDto.password);

    userEnt.salt = hashPassword.salt;
    userEnt.password = hashPassword.hash;

    return await this.accountDbService.createAccount(userEnt);
  }

  verifyPassword = (persistedPassword: PersistedPassword, passwordAttempt: string): Promise<boolean> => {
    return new Promise<boolean>((accept, reject) => {
      crypto.pbkdf2(
        passwordAttempt,
        persistedPassword.salt,
        this.ITERATIONS,
        this.PASSWORD_LENGTH,
        this.DIGEST,
        (error, hash) => {
          if (error) {
            return reject(error);
          }

          accept(persistedPassword.hash === hash.toString(this.BYTE_TO_STRING_ENCODING));
        },
      );
    });
  };

  generateHashPassword(password: string): Promise<PersistedPassword> {
    return new Promise<PersistedPassword>((accept, reject) => {
      const salt = crypto.randomBytes(this.SALT_LENGTH).toString(this.BYTE_TO_STRING_ENCODING);
      crypto.pbkdf2(password, salt, this.ITERATIONS, this.PASSWORD_LENGTH, this.DIGEST, (error, hash) => {
        if (error) {
          return reject(error);
        }

        accept({
          salt,
          hash: hash.toString(this.BYTE_TO_STRING_ENCODING),
          // iterations: this.ITERATIONS,
        });
      });
    });
  }

  async resetUserAccount() {
    const users: CreateUserDto[] = [];

    await this.accountDbService.truncateUsers();

    for (const user of users) {
      await this.createAccount(user);
    }

    return users;
  }
}
