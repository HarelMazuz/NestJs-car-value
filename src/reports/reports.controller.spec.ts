import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { ReportsService } from './reports.service';
import { Report } from './report.entity';

describe('ReportsController', () => {
  let controller: ReportsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersModule,
        ReportsService,
        { provide: getRepositoryToken(Report), useValue: Report },
      ],
      controllers: [ReportsController],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
