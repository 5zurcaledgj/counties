import { Controller, Get, Param } from '@nestjs/common';
import { CountiesService } from './counties.service';
import { County } from './schemas/county.schema';

@Controller('suggest')
export class CountiesController {
  constructor(private countiesService: CountiesService) {}

  @Get()
  async getAll(): Promise<County[]> {
    return this.countiesService.getAll();
  }

  @Get('/:q')
  async suggestion(@Param('q') q: string): Promise<County[]> {
    return this.countiesService.getSuggestion(q);
  }
}
