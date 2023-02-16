import { PartialType } from '@nestjs/mapped-types';
import { CreateSampleModuleDto } from './create-sample-module.dto';

export class UpdateSampleModuleDto extends PartialType(CreateSampleModuleDto) {}
