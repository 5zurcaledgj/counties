import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CountiesService } from './../counties.service';
import { getModelToken } from '@nestjs/mongoose';
import { County } from './../../counties/schemas/county.schema';

const mockCounty = {
  fips: '01001',
  state: 'AL',
  name: 'Autauga',
};

describe('CountiesService', () => {
  let service: CountiesService;
  let model: Model<County>;

  const countyArray = [
    { fips: '01001', state: 'AL', name: 'Autauga' },
    { fips: '01003', state: 'AL', name: 'Baldwin' },
    { fips: '02013', state: 'AK', name: 'Aleutians East Borough' },
    { fips: '04005', state: 'AZ', name: 'Coconino' },
    { fips: '05001', state: 'AR', name: 'Arkansas' },
    { fips: '06025', state: 'CA', name: 'Imperial' },
    { fips: '08009', state: 'CO', name: 'Baca' },
    { fips: '12113', state: 'FL', name: 'Santa Rosa' },
    { fips: '13003', state: 'GA', name: 'Atkinson' },
    { fips: '17027', state: 'IL', name: 'Clinton' },
  ];

  beforeEach(async () => {
    const modelToken = getModelToken('County');
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountiesService,
        { 
          provide: modelToken,
          useValue: {
            new: jest.fn().mockResolvedValue(mockCounty),
            constructor: jest.fn().mockResolvedValue(mockCounty),
            find: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CountiesService>(CountiesService);
    model = module.get<Model<County>>(modelToken);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns 5 counties', async () => {
    const fiveCounties = [
      { fips: '01001', state: 'AL', name: 'Autauga' },
      { fips: '01003', state: 'AL', name: 'Baldwin' },
      { fips: '02013', state: 'AK', name: 'Aleutians East Borough' },
      { fips: '04005', state: 'AZ', name: 'Coconino' },
      { fips: '05001', state: 'AR', name: 'Arkansas' },
    ];

    jest.spyOn(model, 'find').mockReturnValue({
      limit: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(fiveCounties),
      }),
    } as any);

    const counties = await service.getSuggestion(',');
    expect(counties.length).toEqual(5);
  });

  it('returns all counties in state AL', async () => {
    const fiveCounties = [
      { fips: '01001', state: 'AL', name: 'Autauga' },
      { fips: '01003', state: 'AL', name: 'Baldwin' },
    ];

    jest.spyOn(model, 'find').mockReturnValue({
      limit: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(fiveCounties),
      }),
    } as any);

    const counties = await service.getSuggestion(',al');
    expect(counties).toEqual(fiveCounties);
  });
});
