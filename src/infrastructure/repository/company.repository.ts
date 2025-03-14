import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyRepositoryPort } from '../../domain/ports/company.ports';
import { Company } from './company.entity';

@Injectable()
export class CompanyRepositoryAdapter implements CompanyRepositoryPort {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<Company>,
  ) {}

  async findActiveCompanies(from: Date, to: Date): Promise<Company[]> {
    const companies: Company[] = await this.repository
      .createQueryBuilder('company')
      .innerJoin('company.transfers', 'transfer')
      .where('transfer.creationDate >= :from', { from })
      .andWhere('transfer.creationDate <= :to', { to })
      .getMany();
    return companies;
  }

  async findRegisteredCompanies(from: Date, to: Date): Promise<Company[]> {
    return await this.repository
      .createQueryBuilder('company')
      .where(':from <= company.creationDate', { from })
      .andWhere('company.creationDate <= :to', { to })
      .getMany();
  }

  async save(company: Company): Promise<void> {
    await this.repository.save(company);
  }
}
