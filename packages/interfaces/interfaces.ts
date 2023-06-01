import {CipherTypes, User as UserSchema} from '@prisma/client';

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface UserResponse {
  tokens: Tokens,
  user: UserSchema
}

export interface UserJwt {
  sub: string;
  email: string;
  refreshToken?: string
}

export interface User {
  email: string;
  password: string;
  username: string;
}

export interface FieldError {
  field: string;
  error: string;
}

export interface MessageRequest {
  userId: string;
  message: string;
  coding_type: CipherTypes;
  shift?: number;
}