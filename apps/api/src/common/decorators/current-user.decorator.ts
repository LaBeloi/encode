import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserJwt } from 'interfaces';

export const GetCurrentUser = createParamDecorator(
  (key: keyof UserJwt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!key) return request.user;

    return request.user[key];
  },
);
