import { IsNotEmpty, IsString } from 'class-validator';

export class GetLinkHistoryDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}
