import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class EventDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  when: string;

  @IsString()
  image: string;

  @IsEmail()
  UserId: string;
}
