import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';

export interface TransactionInterface {
  amount: number;
}
@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<TransactionInterface>,
  ) {}

  create(transaction: TransactionInterface): Promise<TransactionInterface> {
    return this.transactionRepository.save(
      this.transactionRepository.create(transaction),
    );
  }

  findAll(): Promise<TransactionInterface[]> {
    return this.transactionRepository.find();
  }

  findOne(transactionId: number) {
    return `This action returns a #${transactionId} transaction`;
  }

  update(transactionId: number, data: any): Promise<any> {
    return this.transactionRepository
      .createQueryBuilder()
      .update()
      .set({
        amount: data.amount,
      })
      .where('transactionId = :transactionId', { transactionId })
      .execute();
  }

  delete(transactionId: number): Promise<any> {
    return this.transactionRepository
      .createQueryBuilder()
      .delete()
      .from(Transaction)
      .where('transactionId = :transactionId', { transactionId })
      .execute();
  }
}
