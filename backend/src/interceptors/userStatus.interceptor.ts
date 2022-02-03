import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { UserEntity } from "../user/entities/user.entity";

export interface Response<T> {
    data: T;
}

const verifyUserStatus: (o: UserEntity) => UserEntity = (o) => {
  var currentTime = Number(Math.round(new Date().getTime() / 1000).toString());
  if (o.status !== 'Offline' && (currentTime - Number(o.latestTimeOnline)) > 2) {
      o.status = 'Offline';
  }
  return o;
}

const findUserObj: (obj: any) => any = (obj) => {
  if (typeof obj !== "object" || obj === null) return obj;
  for (let [key, value] of Object.entries(obj)) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      obj[key] = findUserObj(obj[key]);
    } else if (key === 'latestTimeOnline' && obj instanceof UserEntity) {
      obj = verifyUserStatus(obj);
    }
  }
  return obj;
}

@Injectable()
export class setUserStatusInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(map(data => {
          // console.log('----------------------');
          // console.dir(data, { depth: null });
          // console.log('--');
          if (data === undefined || data === null) return data;
          data = findUserObj(data);
          // console.log('--');
          // console.dir(data, { depth: null });
          // console.log('----------------------');
          return data;
         }));
    }
}
