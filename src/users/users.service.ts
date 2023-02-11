import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

export interface UserInterface {
  firstname: string;
  lastname: string;
  email: string;
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
    return this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: string, data: any): Promise<any> {
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

  delete(id: string): Promise<any> {
    return this.userRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }
}
