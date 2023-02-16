import { Test, TestingModule } from '@nestjs/testing';
import { SampleModuleController } from './sample-module.controller';
import { SampleModuleService } from './sample-module.service';

describe('SampleModuleController', () => {
  let controller: SampleModuleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampleModuleController],
      providers: [SampleModuleService],
    }).compile();

    controller = module.get<SampleModuleController>(SampleModuleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
