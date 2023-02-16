import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Transactions } from 'src/transactions/entities/transaction.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  walletId: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @ManyToOne(() => User, (user) => user.wallet, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User[];

  @OneToMany(() => Transactions, (transactions) => transactions.wallet)
  transactions: Transactions[];
}
