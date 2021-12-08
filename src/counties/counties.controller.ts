import { Controller, Get, Query } from '@nestjs/common';
import { CountiesService } from './counties.service';
import { County } from './schemas/county.schema';

@Controller('suggest')
export class CountiesController {
  constructor(private countiesService: CountiesService) {}

  @Get()
  async getAll(@Query('q') q: string): Promise<County[]> {
    return this.countiesService.getSuggestion(q);
  }
}
