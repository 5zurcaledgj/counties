import { County } from './../../schemas/county.schema';

export const countyStub = (): County => {
  return {
    fips: '01001',
    state: 'AL',
    name: 'Autauga',
  };
};

export const CountiesStub = (): County[] => {
  const county = countyStub();
  return Array(5).fill(county);
};
