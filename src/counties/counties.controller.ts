import { Controller, Get } from '@nestjs/common';
import { CountiesService } from './counties.service';

@Controller('counties')
export class CountiesController {
  constructor(private countiesService: CountiesService) {}

  @Get()
  getCounties() {
    return this.countiesService.getCounties();
  }
}
