import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { County, CountyDocument } from '../counties/schemas/county.schema';

interface RegExCondition {
  $regex: string;
  $options: string;
}

@Injectable()
export class CountiesService {
  private LIMIT = 5;
  private QUERY_INDEX = 0;
  private STATE_INDEX = 1;
  private STATE_CODE_LENGTH = 2;
  constructor(
    @InjectModel(County.name)
    private readonly countyModel: Model<CountyDocument>,
  ) {}

  buildRegexCondition(condition: string): RegExCondition {
    return { $regex: condition.trim(), $options: 'i' };
  }

  async getSuggestion(
    q: string,
    limit: number = this.LIMIT,
  ): Promise<County[]> {
    const query = q.split(',');
    let condition = null;
    const queryString = query[this.QUERY_INDEX];
    const regexCondition = this.buildRegexCondition(queryString);
    if (query.length == 1 && queryString.length > 0) {
      // meaning we only process non empty string
      condition = {
        $or: [{ state: regexCondition }, { name: regexCondition }],
      };
      if (query[0].length == this.STATE_CODE_LENGTH)  { 
        // user is trying to check the state code so prioritize it 
        condition = { state: regexCondition };
      }
    }

    if (query.length > 1) {
      let _cond = { };
      if (queryString.length > 1) {
        //non empty string
        _cond = { name: regexCondition  };
      }

      const stateQuery = query[this.STATE_INDEX];
      if (stateQuery.length > 1) {
        //non empty string
        _cond = { ..._cond, state: this.buildRegexCondition(stateQuery)  };
      }

      if (Object.keys(_cond).length !== 0) {
        condition = _cond;
      }
    }

    return this.countyModel
      .find(condition, { _id: 0 })
      .limit(limit)
      .exec();
  }
}
