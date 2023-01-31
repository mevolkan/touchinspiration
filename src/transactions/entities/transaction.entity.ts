import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Wallet } from 'src/wallet/entities/wallet.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  transactionId: number;

  @Column({ type: 'timestamp' })
  transactionDate: Date;

  @Column()
  amount: number;

  @ManyToMany(() => Wallet)
  @JoinTable()
  wallet: Wallet[];
}
