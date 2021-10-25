import { Injectable } from '@nestjs/common';
import { ExchangeInfo } from '../models/exchangeInfo';
import { AveragePrice } from '../models/averagePrice';
/* eslint-disable  @typescript-eslint/no-var-requires */
const { Spot } = require('@binance/connector');

@Injectable()
export class ConnBinanceService {
  private client = new Spot('', '');

  getExchangeInfo(symbol?: string | string[]): Promise<ExchangeInfo> {
    return new Promise((resolve, reject) => {
      this.client
        .exchangeInfo(symbol)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => reject(error));
    });
  }

  async getCurrentPriceAverage(symbol: string): Promise<AveragePrice> {
    return new Promise((resolve, reject) => {
      this.client
        .avgPrice(symbol)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }
}
