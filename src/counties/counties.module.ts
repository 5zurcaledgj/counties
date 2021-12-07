import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { County, CountySchema } from 'src/counties/schemas/county.schema';
import { CountiesController } from './counties.controller';
import { CountiesService } from './counties.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: County.name,
        schema: CountySchema,
      },
    ]),
  ],
  controllers: [CountiesController],
  providers: [CountiesService],
})
export class CountiesModule {}
