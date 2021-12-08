import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { County, CountyDocument } from 'src/counties/schemas/county.schema';

@Injectable()
export class CountiesService {
  private LIMIT = 5;
  constructor(
    @InjectModel(County.name)
    private readonly countyModel: Model<CountyDocument>,
  ) {}

  async getSuggestion(q: string): Promise<County[]> {
    const query = q.split(',');
    let condition = null;
    if (query.length == 1) {
      condition = { $or: [ { state: { $regex: /wa/i } }, { name: { $regex: /wa/i } }] };
      if (query[0].length == 2)  { // user is trying to check the state code so prioritize it 
        condition = { state: { $regex: /wa/i } };
      }
    }
    
    if (query.length > 1) { 
      condition = { name: { $regex: /cowlitz/i } , state: { $regex: /wa/i } };
    } 
    
    return this.countyModel.find(condition).limit(this.LIMIT);
  }
}
