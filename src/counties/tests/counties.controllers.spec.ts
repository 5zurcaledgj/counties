import { County } from 'src/counties/schemas/county.schema';
import { Test } from '@nestjs/testing';

import { CountiesController } from './../counties.controller';
import { CountiesService } from './../counties.service';
import { NotFoundException } from '@nestjs/common';

jest.mock('../counties.service');

describe('CountiesController', () => {
  let controller: CountiesController;
  let service: CountiesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [CountiesController],
      providers: [CountiesService],
    }).compile();

    controller = moduleRef.get<CountiesController>(CountiesController);
    service = moduleRef.get<CountiesService>(CountiesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('When /suggest endpoint is hit with q params', () => {
    let counties: County[];
    beforeEach(async () => {
      counties = await controller.getAll(',');
    });

    it('Then getSuggestion is called', () => {
      expect(service.getSuggestion).toBeCalledWith(',');
    });
  });

  describe('When /suggest endpoint is hit with no q params', () => {
    it('Then NotFoundException is thrown', async () => {
      expect(controller.getAll(null)).rejects.toThrow(NotFoundException);
    });
  });
});
