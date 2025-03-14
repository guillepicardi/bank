import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT ?? '3307', 10),
  username: process.env.MYSQL_USERNAME || 'gpicardi',
  password: process.env.MYSQL_PASSWORD || 'bank787878',
  database: process.env.MYSQL_DATABASE || 'bank',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, //Desactivar en producción!!!
  autoLoadEntities: true,
};
