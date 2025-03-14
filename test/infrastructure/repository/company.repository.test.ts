import { CompanyRepositoryAdapter } from '../../../src/infrastructure/repository/company.repository';
import { Company } from '../../../src/infrastructure/repository/company.entity';

const mockRepository = {
  find: jest.fn(),
  createQueryBuilder: jest.fn(),
  save: jest.fn(),
};

const repositoryAdapter: CompanyRepositoryAdapter = new CompanyRepositoryAdapter(mockRepository as never);

describe('CompanyRepositoryAdapter', () => {
  describe('findActiveCompanies', () => {
    it('should return companies with transfers registered in the last 30 days', async () => {
      // Arrange
      const mockCompanies: Company[] = [
        {
          id: '2',
          name: 'Company 2',
          cuit: '12345678902',
          creationDate: new Date('2025-01-15'),
          transfers: [],
        },
      ];

      const mockQueryBuilder = {
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockCompanies),
      };

      mockRepository.createQueryBuilder.mockReturnValueOnce(mockQueryBuilder);
      const from = new Date('2025-01-01');
      const to = new Date('2025-01-31');

      // Act
      const result = await repositoryAdapter.findActiveCompanies(from, to);

      // Assert
      expect(result).toEqual(mockCompanies);

      expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('company');
      expect(mockQueryBuilder.innerJoin).toHaveBeenCalledWith('company.transfers', 'transfer');
      expect(mockQueryBuilder.where).toHaveBeenCalledWith('transfer.creationDate >= :from', { from });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith('transfer.creationDate <= :to', { to });
      expect(mockQueryBuilder.getMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findRegisteredCompanies', () => {
    it('should return companies registered in the last 30 days', async () => {
      // Arrange
      const mockCompanies: Company[] = [
        {
          id: '2',
          name: 'Company 2',
          cuit: '12345678902',
          creationDate: new Date('2025-01-15'),
          transfers: [],
        },
      ];

      const mockQueryBuilder = {
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockCompanies),
      };

      mockRepository.createQueryBuilder.mockReturnValueOnce(mockQueryBuilder);
      const from = new Date('2025-01-01');
      const to = new Date('2025-01-31');

      // Act
      const result = await repositoryAdapter.findRegisteredCompanies(from, to);

      // Assert
      expect(result).toEqual(mockCompanies);

      expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('company');
      expect(mockQueryBuilder.where).toHaveBeenCalledWith(':from <= company.creationDate', { from });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith('company.creationDate <= :to', { to });
      expect(mockQueryBuilder.getMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('save', () => {
    it('should save a company', async () => {
      // Arrange
      const company: Company = {
        id: '3',
        name: 'Company 3',
        cuit: '12345678903',
        creationDate: new Date(),
        transfers: [],
      };

      mockRepository.save.mockResolvedValue(company as never);

      // Act
      await repositoryAdapter.save(company);

      // Assert
      expect(mockRepository.save).toHaveBeenCalledWith(company);
    });
  });
});
