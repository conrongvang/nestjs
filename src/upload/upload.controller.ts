import { BadRequestException, Controller, Logger, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { AppBaseController } from '../app-base.controller';
import { UploadService } from './upload.service';

@Controller({ path: 'upload', version: '1' })
@ApiTags('Upload')
export class UploadController extends AppBaseController {
  private readonly logger = new Logger(UploadController.name);

  constructor(private readonly inventoryService: UploadService) {
    super();
  }

  @Post('')
  @ApiOperation({ summary: 'Upload file' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFile(@UploadedFile() file) {
    if (!file) throw new BadRequestException(`Files missed`);
    const response = {
      originalname: file && file.originalname ? file.originalname : null,
      filename: file && file.filename ? `uploads/${file.filename}` : null,
    };
    return response;
  }
}
