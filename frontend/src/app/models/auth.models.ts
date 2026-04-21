export type UserRole = 'USER';

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  tokenType: 'Bearer';
  user: UserResponse;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface StoredAuth {
  token: string;
  user: UserResponse;
}
