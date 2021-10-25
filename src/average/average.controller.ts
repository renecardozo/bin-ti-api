import {
  Controller,
  Get,
  HttpStatus,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AverageDto } from './average.dto';
import { AverageService } from './average.service';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@Controller('average')
export class AverageController {
  constructor(private readonly averageService: AverageService) {}

  @Get()
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    summary: `Returns the average of the last "N"
  lectures , the quantity of lectures must be sended like a parameter in the request`,
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Price Average' })
  @ApiQuery({ name: 'symbol', type: String })
  @ApiQuery({ name: 'lectures', type: Number })
  async findOne(@Query() averageDto: AverageDto) {
    return await this.averageService.get(averageDto);
  }
}
