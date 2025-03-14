import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import type { Company } from './company.entity';

@Entity()
export class Transfer {
  @PrimaryColumn({
    type: 'varchar',
    length: 36,
  })
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', length: 22, nullable: false })
  debitAccountCbu: string;

  @Column({ type: 'varchar', length: 22, nullable: false })
  creditAccountCbu: string;

  @CreateDateColumn({ type: 'timestamp' })
  creationDate: Date;

  @ManyToOne('Company', (company: Company) => company.transfers)
  company: Company;
}
