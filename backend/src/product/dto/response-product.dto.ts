import { Expose } from 'class-transformer';

export class ProductResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string | null;

  @Expose()
  price: number;

  @Expose()
  stock: number;

  @Expose()
  shopId: number;
}
