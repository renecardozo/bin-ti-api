import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { AveragePrice } from '../models/averagePrice';

@Entity('pairs')
class Pair {
  @ObjectIdColumn()
  id: string;

  @Column()
  symbol: string;

  @Column({ array: true, default: [''] })
  averagePrice: AveragePrice[];
}

export { Pair };
