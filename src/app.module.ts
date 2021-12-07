import { Module } from '@nestjs/common';
import { CountiesModule } from './counties/counties.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo:27017/counties'),
    CountiesModule,
  ],
})
export class AppModule { }
