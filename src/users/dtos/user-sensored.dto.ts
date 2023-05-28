import { Expose } from 'class-transformer';
export class UserSensoredDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
}
