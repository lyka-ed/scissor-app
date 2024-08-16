import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LinkHistoryDocument = HydratedDocument<LinkHistory>;

@Schema({ timestamps: true })
export class LinkHistory {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true })
  shortUrl: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const LinkHistorySchema = SchemaFactory.createForClass(LinkHistory);
