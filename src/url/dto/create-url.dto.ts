import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUrlDto {
  @IsNotEmpty()
  @IsString()
  destination: string;

  @IsOptional()
  @IsString()
  customAlias?: string;
}
