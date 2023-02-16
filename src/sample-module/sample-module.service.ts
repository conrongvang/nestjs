import { Injectable } from '@nestjs/common';
import { CreateSampleModuleDto } from './dto/create-sample-module.dto';
import { UpdateSampleModuleDto } from './dto/update-sample-module.dto';

@Injectable()
export class SampleModuleService {
  create(createSampleModuleDto: CreateSampleModuleDto) {
    return 'This action adds a new sampleModule';
  }

  findAll() {
    return `This action returns all sampleModule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sampleModule`;
  }

  update(id: number, updateSampleModuleDto: UpdateSampleModuleDto) {
    return `This action updates a #${id} sampleModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} sampleModule`;
  }
}
