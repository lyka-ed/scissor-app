import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcde098765', 4);
export type UrlDocument = HydratedDocument<Url>;

@Schema({ timestamps: true })
export class Url {
  @Prop({
    type: String,
    unique: true,
    required: true,
    default: () => nanoid(4),
  })
  shortId: string;

  @Prop({ type: String, required: true })
  destination: string;

  @Prop({ type: Number, required: true, default: 0 })
  clicks: number;

  @Prop({ type: String, required: true })
  auth0Id: string;

  @Prop({
    type: String,
    unique: true,
    sparse: true,
    default: undefined,
  })
  customAlias?: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
