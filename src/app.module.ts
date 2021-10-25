import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { ConnBinanceService } from './pairs/conn-binance.service';
import { PairsModule } from './pairs/pairs.module';
import { AverageModule } from './average/average.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'bin-db',
      autoLoadEntities: true,
      useUnifiedTopology: true,
      entities: [join(__dirname, '**/**.entity(.ts,.js)')],
    }),
    AverageModule,
    PairsModule,
  ],
  controllers: [],
  providers: [ConnBinanceService],
})
export class AppModule {}
