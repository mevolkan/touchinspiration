import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';

export interface WalletInterface {
  name: string;
  amount: number;
}
@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<WalletInterface>,
  ) {}

  create(wallet: WalletInterface): Promise<WalletInterface> {
    return this.walletRepository.save(this.walletRepository.create(wallet));
  }

  findAll(): Promise<WalletInterface[]> {
    return this.walletRepository.find();
  }

  findOne(walletId: number) {
    return `This action returns a #${walletId} wallet`;
  }

  update(walletId: number, data: any): Promise<any> {
    return this.walletRepository
      .createQueryBuilder()
      .update()
      .set({
        name: data.name,
        amount: data.amount,
      })
      .where('walletId = :walletId', { walletId })
      .execute();
  }

  delete(walletId: number): Promise<any> {
    return this.walletRepository
      .createQueryBuilder()
      .delete()
      .from(Wallet)
      .where('walletId = :walletId', { walletId })
      .execute();
  }
}
