import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import {
  TransactionsInterface,
  TransactionsService,
} from './transactions.service';

interface CreateTransactionDto {
  amount: number;
  walletId: number;
}

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    const transaction = await this.transactionsService.create(
      createTransactionDto,
    );
    if (!transaction) {
      return 'Error creating transaction';
    }
    return 'Transaction created successfully';
  }

  @Get()
  async findAll(@Req() request: Request) {
    const transaction: Array<TransactionsInterface> =
      await this.transactionsService.findAll();
    return transaction;
  }

  @Get(':transactionId')
  findOne(@Param('transactionId') transactionId: number) {
    return this.transactionsService.findOne(+transactionId);
  }

  @Patch(':transactionId')
  async update(
    @Param('transactionId') transactionId: number,
    @Body() body: any,
  ) {
    const newTransaction: any = await this.transactionsService.update(
      +transactionId,
      body,
    );
    return 'Transaction updated' + newTransaction;
  }

  @Delete(':transactionId')
  async delete(@Param('transactionId') transactionId: number) {
    await this.transactionsService.delete(+transactionId);
  }
}
