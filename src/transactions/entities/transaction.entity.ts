import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Wallet } from 'src/wallet/entities/wallet.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  transactionId: number;

  @CreateDateColumn()
  transactionDate: Date;

  @Column()
  amount: number;

  @ManyToOne(() => Wallet, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  wallet: Wallet[];
}
