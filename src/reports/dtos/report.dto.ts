import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;
  @Expose()
  approved: boolean;
  @Expose()
  price: number;
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  mileage: number;

  @Transform(({ obj }) => obj.user.id) //obj is the request entity instance and then we take the value of the user entity inside of our entity then the id of it.
  @Expose()
  userId: number;
}
