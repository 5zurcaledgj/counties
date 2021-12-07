import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { County, CountyDocument } from 'src/counties/schemas/county.schema';

@Injectable()
export class CountiesService {
  constructor(
    @InjectModel(County.name)
    private readonly countyModel: Model<CountyDocument>,
  ) {}

  async getSuggestion(q: string): Promise<County[]> {
    return this.countyModel.find().exec();
  }

  async getAll(): Promise<County[]> {
    return this.countyModel.find().exec();
  }
}
