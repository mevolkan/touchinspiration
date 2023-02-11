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
  @PrimaryGeneratedColumn('uuid')
  transactionId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  transactionDate: Date;

  @Column()
  amount: number;

  @ManyToMany(() => Wallet, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  wallet: Wallet[];
}
