export interface LoginRequestI {
  email: string;
  password: string;
}

export interface LoginResponseI {
  token: string;
}

export interface RegisterRequestI {
  name: string;
  password: string;
  email: string;
  bio: string;
  avatar?: string;
}

export interface RegisterResponseI {
  token: string;
}

export interface ResetI {
  password: string;
}

export interface ChangeI {
  password: string;
  newpassword: string;
}

export interface ForgotI {
  email: string;
}
