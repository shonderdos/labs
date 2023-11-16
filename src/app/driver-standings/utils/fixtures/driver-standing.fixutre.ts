import { DriverStanding } from '../driver-standing.interface';

export const createDriverStanding = (override?: Partial<DriverStanding>): DriverStanding => {
  return {
    constructorName: 'Williams',
    driverId: 'latifi',
    constructorId: 'williams',
    firstName: 'Nicholas',
    lastName: 'Latifi',
    points: '86',
    driverNumber: '6',
    position: 1,
    id: 'mocked-id',
    ...override,
  };
};
