import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class UserSignInDto {
  @IsNotEmpty({ message: 'Email can not be Null' })
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;

  @IsNotEmpty({ message: 'Password can not be Null' })
  @MinLength(5, { message: 'Password minimum character should be 5' })
  password: string;
}