import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { plainToInstance } from "class-transformer"
import { map, Observable } from "rxjs"

import { SerializeMetadataName } from "../decorators"

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map(this.serialize)
        }
        return this.serialize(data)
      })
    )
  }

  private serialize = (data: any) => {
    const Class = this.reflector.get(SerializeMetadataName, data?.constructor)
    if (Class) {
      return plainToInstance(Class, data, { excludeExtraneousValues: true })
    }
    return data
  }
}
