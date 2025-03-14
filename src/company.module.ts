import { Module } from '@nestjs/common';
import { CompanyService } from './application/company.service';
import { CompanyController } from './infrastructure/api/company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './infrastructure/repository/company.entity';
import { Transfer } from './infrastructure/repository/transfer.entity';
import { CompanyRepositoryAdapter } from './infrastructure/repository/company.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Transfer])],
  controllers: [CompanyController],
  providers: [
    CompanyService,
    {
      provide: 'CompanyRepositoryAdapter',
      useClass: CompanyRepositoryAdapter,
    },
  ],
  exports: [],
})
export class CompanyModule {}
