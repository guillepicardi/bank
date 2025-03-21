import { Inject, Injectable } from '@nestjs/common';
import { CompanyServicePort } from '../domain/ports/company.service.port';
import { CompanyRepositoryPort } from '../domain/ports/company.repository.port';
import { Company } from '../domain/models/company.models';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CompanyService implements CompanyServicePort {
  constructor(
    @Inject('CompanyRepositoryAdapter')
    private companyRepository: CompanyRepositoryPort,
  ) {}

  async findActiveCompaniesLastMonth(): Promise<Company[]> {
    const from = new Date();
    from.setDate(from.getDate() - 60);
    const to = new Date();
    const companies: Company[] = await this.companyRepository.findActiveCompanies(from, to);

    return companies;
  }

  async findCompaniesJoinedLastMonth(): Promise<Company[]> {
    const from = new Date();
    from.setDate(from.getDate() - 30);
    const to = new Date();
    return this.companyRepository.findRegisteredCompanies(from, to);
  }

  async create(name: string, cuit: string): Promise<Company> {
    const company: Company = {
      id: uuid(),
      name,
      cuit,
      creationDate: new Date(),
    };
    await this.companyRepository.save(company);
    return company;
  }
}
