import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CountyDocument = County & Document;

@Schema()
export class County {
  @Prop()
  fips: string;

  @Prop()
  state: string;

  @Prop()
  name: string;
}

export const CountySchema = SchemaFactory.createForClass(County);
