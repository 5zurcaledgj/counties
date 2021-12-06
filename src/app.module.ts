import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountiesModule } from './counties/counties.module';

@Module({
  imports: [CountiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
