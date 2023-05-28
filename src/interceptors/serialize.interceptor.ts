import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

// אינטרפייס להגדרת קלאס בלבד כדי להגביל את מה שיקבל הבנאי במקום שיקבל הכל
interface ClassConstructor {
  new (...args: any[]): {};
}

//custom decorator for simpler use
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) {}
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> {
    //Run something before a request is handled by the request handler

    return handler.handle().pipe(
      map((data: any) => {
        //Run something before the response is sent out
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
