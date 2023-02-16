import { Module } from '@nestjs/common';
import { DatabaseModule } from '../shared/database/database.module';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
