export interface LoginResponse {
  message: string;
  tokens: {
    access_token: string;
    refresh_token: string;
    token_type: string;
  };
  user: {
    id: string;
    email: string;
    name: string;
    [key: string]: any;
  };
}
