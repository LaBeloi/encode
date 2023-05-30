export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface UserJwt {
  sub: string;
  email: string;
  refreshToken?: string
}