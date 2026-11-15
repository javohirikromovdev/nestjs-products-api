import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    description: 'Mahsulot nomi',
    example: 'iPhone 15 Pro',
    minLength: 3,
    maxLength: 30,
    required: false,
  })
  @IsOptional()
  @IsString({ message: "Title string bo'lishi kerak!" })
  @IsNotEmpty({ message: "Title bo'sh bo'lishi mumkin emas!" })
  @Length(3, 30, { message: "3-30 oralig'ida kiriting" })
  title?: string;

  @ApiProperty({
    description: 'Mahsulot narxi',
    example: 5000000,
    minimum: 1,
    maximum: 10000000,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: "price number bo'lishi shart!" })
  @Min(1, { message: 'Min narx 1' })
  @Max(10000000, { message: 'Max narx 10000000' })
  price?: number;
}
