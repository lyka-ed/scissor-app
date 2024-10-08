import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QRCodeDocument = HydratedDocument<QRCode>;

@Schema({ timestamps: true })
export class QRCode {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true })
  qrCodeBase64: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const QRCodeSchema = SchemaFactory.createForClass(QRCode);
