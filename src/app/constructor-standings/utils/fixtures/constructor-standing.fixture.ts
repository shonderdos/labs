import { ConstructorStanding } from '../constructor-standings.interface';

export const createConstructorStanding = (override?: Partial<ConstructorStanding>): ConstructorStanding => {
  return {
    position: 1,
    points: 86,
    constructorId: 'ferrari',
    constructorName: 'Ferrari',
    ...override,
  };
};
