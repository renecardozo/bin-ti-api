import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pair } from './pairs.entity';
import { PairDto } from './pair.dto';
import { ConnBinanceService } from './conn-binance.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class PairsService {
  private symbolList = [];

  constructor(
    @InjectRepository(Pair)
    private readonly pairRespository: Repository<Pair>,
    private readonly connBinanceService: ConnBinanceService,
  ) {
    this.getAllSymbol();
  }

  private async getAllSymbol() {
    try {
      this.symbolList = (
        await this.connBinanceService.getExchangeInfo()
      ).symbols;
    } catch (error) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    return await this.pairRespository.find({ select: ['symbol'] });
  }

  async update(id: string, pair: PairDto) {
    try {
      const pairItem = await this.pairRespository.findOne(id);
      if (!pairItem) throw new Error();
      await this.pairRespository.update(id, pair);
    } catch (error) {
      console.log(error);
      throw new HttpException('Pair not found.', HttpStatus.NOT_FOUND);
    }
  }

  async save(pairDto: PairDto) {
    const pair = new Pair();
    pair.symbol = pairDto.symbol;
    if (!this.symbolList.find((item) => item.symbol === pairDto.symbol)) {
      throw new HttpException(
        'Symbol not exist on binance, please enter a valid symbol',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.pairRespository.save(pair);
  }

  @Cron(CronExpression.EVERY_HOUR)
  async automatedProc() {
    const pairsList = await this.pairRespository.find();
    for (const pair of pairsList) {
      const currentPrice = await this.connBinanceService.getCurrentPriceAverage(
        pair.symbol,
      );
      if (!pair.averagePrice) pair.averagePrice = [];
      pair.averagePrice.push(currentPrice);
      await this.update(pair.id, pair);
    }
  }
}
