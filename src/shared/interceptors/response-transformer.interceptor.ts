import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Response<T> {
  statusCode: number;
  message?: string;
  data?: T;
  error?: any;
}

@Injectable()
export class ResponseTransformerInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();

    // ignore transform for health check api call
    const ignoreApiPaths = ['/api/postman', '/api/hc'];
    if (ignoreApiPaths.includes(request.route.path)) {
      return next.handle();
    }

    const successRespCode = [HttpStatus.OK, HttpStatus.ACCEPTED, HttpStatus.CREATED];
    return next.handle().pipe(
      map((_data) => {
        const response = context.switchToHttp().getResponse();

        if (successRespCode.includes(response.statusCode)) {
          return { statusCode: response.statusCode, data: _data };
        }

        return { statusCode: response.statusCode, message: _data.message, error: _data.error };
      }),
    );
  }
}
