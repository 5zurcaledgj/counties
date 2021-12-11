import { CountiesStub } from './../tests/stubs/county.stub';

export const CountiesService = jest.fn().mockReturnValue({
  getSuggestion: jest.fn().mockReturnValue(CountiesStub()),
});
