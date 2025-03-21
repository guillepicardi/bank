import { Company } from '../models/company.models';

export interface CompanyRepositoryPort {
  findActiveCompanies(from: Date, to: Date): Promise<Company[]>;
  findRegisteredCompanies(from: Date, to: Date): Promise<Company[]>;
  save(company: Company): Promise<void>;
}
