import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { WalletInterface, WalletService } from './wallet.service';

interface CreateWalletDto {
  name: string;
  amount: number;
  userId: number;
  walletId: number;
}

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  async create(@Body() createWalletDto: CreateWalletDto) {
    const wallet = await this.walletService.create(createWalletDto);
    if (!wallet) {
      return 'Error in creating wallet';
    }
    return 'Wallet created successfully';
  }

  @Get()
  async findAll(@Req() request: Request) {
    const wallet: Array<WalletInterface> = await this.walletService.findAll();
    return wallet;
  }

  @Get(':walletId')
  async findOne(@Param('walletId') walletId: number) {
    return this.walletService.findOne(walletId);
  }

  @Put(':walletId')
  async update(@Param('walletId') walletId: number, @Body() body: any) {
    const newWallet: any = await this.walletService.update(walletId, body);
    return 'Wallet updated';
  }

  @Delete(':walletId')
  async remove(@Param('walletId') walletId: number) {
    await this.walletService.delete(+walletId);
    return 'Wallet deleted';
  }
}
