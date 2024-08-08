import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";
import { IsNull } from "typeorm";

export class CreateProductDto {
  @IsNotEmpty({ message: 'title can not be blank.' })
  @IsString()
  title: string;

  @IsNotEmpty({ message: 'description can not be blank.' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'price can not be blank.' })
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'price should be number' })
  @IsPositive({ message: 'price should be positiv number' })
  price: number;

  @IsNotEmpty({ message: 'stock can not be blank.' })
  @IsNumber({}, { message: 'price should be number' })
  @Min(0, { message: 'stock can not be negative' })
  stock: number;

  @IsNotEmpty({ message: 'images can not be blank.' })
  @IsArray({ message: 'images should be array' })
  images: string[];

  @IsNotEmpty({ message: 'category can not be blank.' })
  @IsNumber({}, { message: 'category id should be number' })
  categoryId: number;
}
