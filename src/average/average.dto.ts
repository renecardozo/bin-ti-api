import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class AverageDto {
  @IsString()
  @IsNotEmpty()
  symbol: string;

  @Type(() => Number)
  @IsNumber()
  lectures: number;
}
