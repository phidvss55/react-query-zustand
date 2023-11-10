import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    name: 'Last name',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  gender: string;

  @IsString()
  country: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  avatar: string;

  @IsString()
  btc_address: string;
}
