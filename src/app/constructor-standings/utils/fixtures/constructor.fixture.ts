import { ConstructorsEntity } from '../../../shared/interfaces/standings.interface';

export const createConstructor = (override?: Partial<ConstructorsEntity>): ConstructorsEntity => {
  return {
    constructorId: 'williams',
    url: 'http://fake-url.com',
    name: 'Williams',
    nationality: 'British',
    ...override,
  };
};
