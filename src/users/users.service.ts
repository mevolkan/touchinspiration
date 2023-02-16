import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

export interface UserInterface {
  firstname: string;
  lastname: string;
  email: string;
  id: number;
}
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<UserInterface>,
  ) {}

  create(user: UserInterface): Promise<UserInterface> {
    return this.userRepository.save(this.userRepository.create(user));
  }

  findAll(): Promise<UserInterface[]> {
    return this.userRepository.find({
      relations: ['wallet'],
    });
  }

  // findOne(id: number): Promise<any> {
  //   return this.userRepository.findOne({
  //     where: { id: id },
  //     relations: ['wallet'],
  //   });
  // }

  findOne(id: number): Promise<any> {
    const numberofWallets = this.userRepository
      .createQueryBuilder('user')
      .where('user.id =:id', { id })
      .leftJoinAndSelect('user.wallet', 'wallet')
      .loadRelationCountAndMap('user.wallets', 'user.wallet')
      .getMany();

    const amountinWallets = this.userRepository
      .createQueryBuilder('user')
      .where('user.id =:id', { id })
      .leftJoin('wallet', 'wallet.userId')
      .addSelect('SUM(wallet.amount)', 'amountinWallets')
      .getRawOne();

    // return numberofWallets;
    return amountinWallets;

    // return this.userRepository.findOne({
    //   where: { id: id },
    //   relations: ['wallet'],
    // });
  }

  update(id: number, data: any): Promise<any> {
    return this.userRepository
      .createQueryBuilder()
      .update()
      .set({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      })
      .where('id = :id', { id })
      .execute();
  }

  delete(id: number): Promise<any> {
    return this.userRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }
}
