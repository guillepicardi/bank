import { Entity, PrimaryColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import type { Transfer } from './transfer.entity';

@Entity()
export class Company {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
  })
  id: string;

  @Column({ type: 'varchar', length: 60, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 11, nullable: false })
  cuit: string;

  @CreateDateColumn({ type: 'timestamp' })
  creationDate: Date;

  @OneToMany('Transfer', (transfer: Transfer) => transfer.company)
  transfers: Transfer[];
}
