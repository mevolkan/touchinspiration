import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transactions } from './entities/transaction.entity';

export interface TransactionsInterface {
  amount: number;
  walletId: number;
}
@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transactions)
    private transactionRepository: Repository<TransactionsInterface>,
  ) {}

  create(transaction: TransactionsInterface): Promise<TransactionsInterface> {
    return this.transactionRepository.save(
      this.transactionRepository.create(transaction),
    );
  }

  findAll(): Promise<TransactionsInterface[]> {
    return this.transactionRepository.find({
      relations: ['wallet'],
    });
  }

  findOne(transactionId: number) {
    return this.transactionRepository.findOne({
      where: { transactionId },
    });
  }

  update(transactionId: number, data: any): Promise<any> {
    return this.transactionRepository
      .createQueryBuilder()
      .update()
      .set({
        amount: data.amount,
        walletId: data.walletId,
      })
      .where('transactionId = :transactionId', { transactionId })
      .execute();
  }

  delete(transactionId: number): Promise<any> {
    return this.transactionRepository
      .createQueryBuilder()
      .delete()
      .from(Transactions)
      .where('transactionId = :transactionId', { transactionId })
      .execute();
  }
}
