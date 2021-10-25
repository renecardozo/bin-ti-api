import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pair } from '../pairs/pairs.entity';
import { AverageDto } from './average.dto';

@Injectable()
export class AverageService {
  constructor(
    @InjectRepository(Pair)
    private readonly pairRespository: Repository<Pair>,
  ) {}

  async get(averageDto: AverageDto) {
    try {
      const pair = await this.pairRespository.findOne({
        symbol: averageDto.symbol,
      });
      const { averagePrice } = pair;
      const lectures = averagePrice.slice(0, averageDto.lectures);
      const sumPrice = lectures.reduce((sum, item) => {
        return sum + parseFloat(item.price);
      }, 0);
      return {
        average: sumPrice / lectures.length,
        numberOfLecture: averageDto.lectures,
      };
    } catch (error) {
      throw new HttpException('Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
