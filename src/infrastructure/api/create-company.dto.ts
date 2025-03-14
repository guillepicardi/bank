import { IsString, IsNumberString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  constructor(name: string, cuit: string) {
    this.name = name;
    this.cuit = cuit;
  }

  @ApiProperty({
    example: 'Banking Sample Restful API',
    description: 'Company name (max 60 characters)',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(60, { message: 'name must be no longer than 60 characters' })
  name: string;

  @ApiProperty({
    example: '20345678901',
    description: 'Cuit sin guiones (max 11 caracteres)',
  })
  @IsNumberString()
  @IsNotEmpty()
  @MaxLength(11, { message: 'cuit must be no longer than 11 characters' })
  cuit: string;
}
