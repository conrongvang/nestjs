import { ResetPasswordDbService } from './resetPassword-database.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigs } from '../../app.config';
import { AccountDatabaseService } from './account-database.service';

import { ResetPasswordTokenEntity } from './entities/resetPasswordToken.entity';
import { SettingEntity } from './entities/setting.entity';
import { UserEntity } from './entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // name: Const.DEFAULT_CONN_NAME,
      type: 'mongodb',
      host: AppConfigs.db.host,
      port: AppConfigs.db.port,
      username: AppConfigs.db.username !== '' ? AppConfigs.db.username : null,
      password: AppConfigs.db.password !== '' ? encodeURIComponent(AppConfigs.db.password) : null,
      database: AppConfigs.db.database,
      ssl: false,
      useUnifiedTopology: true,
      autoLoadEntities: true,
      synchronize: true, // enable this feature in development mode only
    }),
    TypeOrmModule.forFeature([UserEntity, SettingEntity, ResetPasswordTokenEntity]),
  ],
  providers: [AccountDatabaseService, ResetPasswordDbService],
  exports: [AccountDatabaseService, ResetPasswordDbService],
})
export class DatabaseModule {}
