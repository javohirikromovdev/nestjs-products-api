import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Foydalanuvchi ismi',
    example: 'Ali',
    minLength: 3,
    maxLength: 30,
  })
  @IsString({ message: "Ism string bo'lishi kerak!" })
  @Length(3, 30, { message: "Ism 3-30 oralig'ida bo'lishi kerak!" })
  name: string;

  @ApiProperty({
    description: 'Elektron pochta manzili',
    example: 'ali@example.com',
    format: 'email',
  })
  @IsEmail({}, { message: "To'g'ri email kiriting!" })
  email: string;

  @ApiProperty({
    description: 'Foydalanuvchi paroli',
    example: 'parol123',
    minLength: 6,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
