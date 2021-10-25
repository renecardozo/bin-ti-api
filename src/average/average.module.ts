import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AverageController } from './average.controller';
import { AverageService } from './average.service';
import { Pair } from '../pairs/pairs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pair])],
  controllers: [AverageController],
  providers: [AverageService],
})
export class AverageModule {}
