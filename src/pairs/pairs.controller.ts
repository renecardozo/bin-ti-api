import { ValidationPipe } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PairDto } from './pair.dto';
import { PairsService } from './pairs.service';

@Controller('pairs')
export class PairsController {
  constructor(private readonly pairsService: PairsService) {}

  @ApiOperation({ summary: `Return a array of existing pairs created` })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of pairs symbols' })
  @Get()
  async findAll() {
    return await this.pairsService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: `Store a new pair symbol` })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The pair symbol created',
  })
  async save(@Body() pair: PairDto) {
    return await this.pairsService.save(pair);
  }
}
