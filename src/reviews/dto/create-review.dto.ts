import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty({ message: 'productId can not be empty' })
  @IsNumber({}, { message: 'productId should be number' })
  productId: number;

  @IsNotEmpty({ message: 'productId can not be empty' })
  @IsNumber()
  ratings: number;

  @IsNotEmpty({ message: 'productId can not be empty' })
  @IsString()
  comment: string;
}
