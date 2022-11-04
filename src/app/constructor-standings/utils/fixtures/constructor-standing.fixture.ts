import { ConstructorStandingEntity } from '../../../shared/interfaces/standings.interface';
import { createConstructor } from './constructor.fixture';

export const createConstructorStanding = (override?: Partial<ConstructorStandingEntity>): ConstructorStandingEntity => {
  return {
    position: '1',
    positionText: '1',
    points: '86',
    wins: '12',
    Constructor: createConstructor(override?.Constructor),
    ...override,
  };
};
