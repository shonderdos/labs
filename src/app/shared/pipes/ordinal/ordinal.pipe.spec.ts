import { OrdinalPipe } from './ordinal.pipe';

describe('ordinalPipe', () => {
  const pipe = new OrdinalPipe();

  it('should return 1st when given 1', () => {
    expect(pipe.transform(1)).toBe('1st');
  });
  it('should return 2nd when given 2', () => {
    expect(pipe.transform(2)).toBe('2nd');
  });
  it('should return 3rd when given 3', () => {
    expect(pipe.transform(3)).toBe('3rd');
  });
  it('should return 4th when given 4', () => {
    expect(pipe.transform(4)).toBe('4th');
  });
  it('should return 20th when given 20', () => {
    expect(pipe.transform(20)).toBe('20th');
  });
  it('should return 21st when given 21', () => {
    expect(pipe.transform(21)).toBe('21st');
  });
  it('should return 22nd when given 22', () => {
    expect(pipe.transform(22)).toBe('22nd');
  });
  it('should return 23rd when given 23', () => {
    expect(pipe.transform(23)).toBe('23rd');
  });
  it('should return 24th when given 24', () => {
    expect(pipe.transform(24)).toBe('24th');
  });
  it('should return 101st when given 101', () => {
    expect(pipe.transform(101)).toBe('101st');
  });
  it('should return 102nd when given 102', () => {
    expect(pipe.transform(102)).toBe('102nd');
  });
  it('should return 103rd when given 103', () => {
    expect(pipe.transform(103)).toBe('103rd');
  });
  it('should return 104th when given 104', () => {
    expect(pipe.transform(104)).toBe('104th');
  });
});
