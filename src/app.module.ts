import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [UsersModule, WalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
