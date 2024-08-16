import { IsNotEmpty, IsString } from 'class-validator';

export class GetShortUrlDto {
  @IsNotEmpty()
  @IsString()
  shortId: string;
}
