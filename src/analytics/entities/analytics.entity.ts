import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AnalyticsDocument = HydratedDocument<Analytics>;

@Schema({ timestamps: true })
export class Analytics {
  @Prop({ type: Types.ObjectId, ref: 'shortUrl', required: true })
  shortUrl: Types.ObjectId;

  @Prop({ default: 'Unknown' })
  referrer?: string;

  @Prop({ default: 'Unknown' })
  userAgent?: string;

  @Prop({ default: 'Unknown' })
  ipAddress?: string;

  @Prop({ required: true })
  destination: string;
}

export const AnalyticsSchema = SchemaFactory.createForClass(Analytics);
