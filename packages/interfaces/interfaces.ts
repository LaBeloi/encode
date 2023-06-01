export interface Tokens {
  access_token: string;
  refresh_token: string;
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