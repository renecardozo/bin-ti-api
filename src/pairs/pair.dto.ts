import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AveragePrice } from '../models/averagePrice';

export class PairDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  symbol: string;

  averagePrice: AveragePrice[];
}
