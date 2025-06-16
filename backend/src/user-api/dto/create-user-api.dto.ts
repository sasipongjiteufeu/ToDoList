import { IsString, IsEmail, IsEmpty, IsNumber } from 'class-validator';


export class CreateUserApiDto {



@IsEmpty()
@IsString()
  username: string;
@IsEmpty()
@IsEmail()
  email: string;
@IsEmpty()
@IsString()
  password: string;

}
