import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PairsController } from './pairs.controller';
import { PairsService } from './pairs.service';
import { ConnBinanceService } from './conn-binance.service';
import { Pair } from './pairs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pair])],
  controllers: [PairsController],
  providers: [PairsService, ConnBinanceService],
})
export class PairsModule {}
