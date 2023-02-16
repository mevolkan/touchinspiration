import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Wallet } from 'src/wallet/entities/wallet.entity';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn('uuid')
  transactionId: number;

  @CreateDateColumn()
  transactionDate: Date;

  @Column()
  amount: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.transactions, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  wallet: Wallet[];
}
