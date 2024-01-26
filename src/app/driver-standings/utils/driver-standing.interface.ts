export interface DriverStanding {
  firstName?: string | null;
  lastName?: string | null;
  id?: string | null;
  email?: string | null;
  phoneNumber?: string | null;

  // DEPRECATED PROPERTIES
  driverId?: string | null;
  constructorName?: string | null;
  constructorId?: string | null;
  points?: string | null;
  position?: string | null;
  driverNumber?: string | null;
}
