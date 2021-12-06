import { Module } from '@nestjs/common';
import { CountiesController } from './counties.controller';
import { CountiesService } from './counties.service';

@Module({
  controllers: [CountiesController],
  providers: [CountiesService],
})
export class CountiesModule {}