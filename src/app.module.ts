import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EncryptModule } from './encrypt/encrypt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), AppModule, EncryptModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
