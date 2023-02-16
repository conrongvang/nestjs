import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SampleModuleService } from './sample-module.service';
import { CreateSampleModuleDto } from './dto/create-sample-module.dto';
import { UpdateSampleModuleDto } from './dto/update-sample-module.dto';

@Controller('sample-module')
export class SampleModuleController {
  constructor(private readonly sampleModuleService: SampleModuleService) {}

  @Post()
  create(@Body() createSampleModuleDto: CreateSampleModuleDto) {
    return this.sampleModuleService.create(createSampleModuleDto);
  }

  @Get()
  findAll() {
    return this.sampleModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sampleModuleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSampleModuleDto: UpdateSampleModuleDto) {
    return this.sampleModuleService.update(+id, updateSampleModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sampleModuleService.remove(+id);
  }
}
