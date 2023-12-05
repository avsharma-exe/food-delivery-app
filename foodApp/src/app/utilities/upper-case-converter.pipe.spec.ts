import { UpperCaseConverterPipe } from './upper-case-converter.pipe';

describe('UpperCaseConverterPipe', () => {
  it('create an instance', () => {
    const pipe = new UpperCaseConverterPipe();
    expect(pipe).toBeTruthy();
  });
});
