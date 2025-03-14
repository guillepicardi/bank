import { CompanyService } from '../../src/application/company.service';

const companyRepository = {
  findActiveCompanies: jest.fn(),
  findRegisteredCompanies: jest.fn(),
  save: jest.fn(),
};

jest.mock('uuid', () => ({ v4: jest.fn(() => 'mocked-uuid-1234') }));

const companyService = new CompanyService(companyRepository);
describe('CompanyService', () => {
  // Arrange
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-03-07T00:00:00Z'));
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  describe('findActiveCompaniesLastMonth', () => {
    it('should return active companies from the last month', async () => {
      // Arrange
      const mockCompanies = [
        {
          id: '1',
          name: 'Empresa 1',
          cuit: '12345678901',
          creationDate: new Date('2025-03-01'),
        },
        {
          id: '2',
          name: 'Empresa 2',
          cuit: '12345678902',
          creationDate: new Date('2025-02-25'),
        },
      ];
      companyRepository.findActiveCompanies.mockResolvedValue(mockCompanies);

      // Act
      const result = await companyService.findActiveCompaniesLastMonth();

      // Assert
      expect(result).toEqual(mockCompanies);

      expect(companyRepository.findActiveCompanies).toHaveBeenCalledWith(
        new Date('2025-02-05T00:00:00Z'),
        new Date('2025-03-07T00:00:00Z'),
      );
    });

    it('should return an empty array if no active companies are found', async () => {
      // Arrange
      companyRepository.findActiveCompanies.mockResolvedValue([]);

      // Act
      const result = await companyService.findActiveCompaniesLastMonth();

      // Assert
      expect(result).toEqual([]);
      expect(companyRepository.findActiveCompanies).toHaveBeenCalled();
    });
  });

  describe('findCompaniesJoinedLastMonth', () => {
    it('should return companies joined from the last month', async () => {
      // Arrange
      const mockCompanies = [
        {
          id: '1',
          name: 'Empresa 1',
          cuit: '12345678901',
          creationDate: new Date('2025-03-01'),
        },
        {
          id: '2',
          name: 'Empresa 2',
          cuit: '12345678902',
          creationDate: new Date('2025-02-15'),
        },
      ];
      companyRepository.findRegisteredCompanies.mockResolvedValue(mockCompanies);

      // Act
      const result = await companyService.findCompaniesJoinedLastMonth();

      // Assert
      expect(result).toEqual(mockCompanies);
      expect(companyRepository.findRegisteredCompanies).toHaveBeenCalled();
    });

    it('should return an empty array if no companies joined last month', async () => {
      // Arrange
      companyRepository.findRegisteredCompanies.mockResolvedValue([]);

      // Act
      const result = await companyService.findCompaniesJoinedLastMonth();

      // Assert
      expect(result).toEqual([]);
      expect(companyRepository.findRegisteredCompanies).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new company', async () => {
      // Act
      const company = await companyService.create('Company Name', '12345678901');

      // Assert
      expect(company.name).toEqual('Company Name');
      expect(company.cuit).toEqual('12345678901');
      expect(company.id).toEqual('mocked-uuid-1234');
      expect(company.creationDate).toEqual(new Date('2025-03-07T00:00:00Z'));
    });
  });
});
