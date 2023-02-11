import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  walletId: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @Column()
  date: string;

  @ManyToOne(() => User, (user) => user.wallet)
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.wallet)
  transactions: Transaction[];
}
