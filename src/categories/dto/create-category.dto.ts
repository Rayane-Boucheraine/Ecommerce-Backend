import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Email can not be Null.' })
  @IsString({message: 'title should be string.'})
  title: string;

  @IsNotEmpty({message: 'description can not be empty.'})
  @IsString({message: 'description should be string.'})
  description: string
}
