import { Company } from '../models/company.models';

export interface CompanyServicePort {
  findActiveCompaniesLastMonth(): Promise<Company[]>;
  findCompaniesJoinedLastMonth(): Promise<Company[]>;
  create(name: string, cuit: string): Promise<Company>;
}

export interface CompanyRepositoryPort {
  findActiveCompanies(from: Date, to: Date): Promise<Company[]>;
  findRegisteredCompanies(from: Date, to: Date): Promise<Company[]>;
  save(company: Company): Promise<void>;
}
