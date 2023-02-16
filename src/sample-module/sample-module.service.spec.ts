import { Test, TestingModule } from '@nestjs/testing';
import { SampleModuleService } from './sample-module.service';

describe('SampleModuleService', () => {
  let service: SampleModuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SampleModuleService],
    }).compile();

    service = module.get<SampleModuleService>(SampleModuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
