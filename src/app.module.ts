import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [UsersModule, WalletModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
