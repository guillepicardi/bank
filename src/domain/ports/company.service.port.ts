import { Company } from '../models/company.models';

export interface CompanyServicePort {
  findActiveCompaniesLastMonth(): Promise<Company[]>;
  findCompaniesJoinedLastMonth(): Promise<Company[]>;
  create(name: string, cuit: string): Promise<Company>;
}
