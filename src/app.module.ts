import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from './company.module';
import { dbConfig } from './infrastructure/config/db-config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dbConfig),
    CompanyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
