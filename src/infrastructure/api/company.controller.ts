import { Controller, Get, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiBody } from '@nestjs/swagger';
import { Company } from '../../domain/models/company.models';
import { CompanyService } from '../../application/company.service';
import { CreateCompanyDto } from './create-company.dto';

@ApiTags('company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get('transfers')
  @ApiOperation({
    summary: 'ENDPOINT 1: empresas que hicieron transferencias el último mes',
  })
  @ApiOkResponse({
    description: 'Compañías encontradas',
  })
  async findActiveCompaniesLastMonth() {
    return await this.companyService.findActiveCompaniesLastMonth();
  }

  @Get('companies')
  @ApiOperation({
    summary: 'ENDPOINT 2: Obtengo todas las empresas que se adhirieron el último mes.',
  })
  @ApiOkResponse({
    description: 'Compañías encontradas',
  })
  async findCompaniesJoinedLastMonth() {
    return await this.companyService.findCompaniesJoinedLastMonth();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'ENDPOINT 3: Crear una nueva Compañía' })
  @ApiCreatedResponse({
    description: 'Compañía creada correctamente',
  })
  @ApiBody({ type: CreateCompanyDto })
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return await this.companyService.create(createCompanyDto.name, createCompanyDto.cuit);
  }
}
