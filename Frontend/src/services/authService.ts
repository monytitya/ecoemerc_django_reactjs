import { apiClient } from '../api/client';
import type {
  AuthResponse,
  AuthUser,
  LoginCredentials,
  RegisterData,
} from '../types';

export const authService = {
  // Login with email and password
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login/', {
      email: credentials.email.trim(),
      password: credentials.password,
    });
    return response.data;
  },

  // Register a new user
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register/', {
      first_name: data.first_name.trim(),
      last_name: data.last_name.trim(),
      email: data.email.trim(),
      phone_number: data.phone_number.trim(),
      password: data.password,
      confirm_password: data.confirm_password,
    });
    return response.data;
  },

  // Fetch current user's profile
  async getProfile(): Promise<AuthUser> {
    const response = await apiClient.get<AuthUser>('/profile/');
    return response.data;
  },

  // Logout by blacklisting refresh token (if supported) & clearing local state
  async logout(refreshToken?: string): Promise<void> {
    try {
      if (refreshToken) {
        await apiClient.post('/auth/logout/', { refresh: refreshToken });
      }
    } catch {
      // Ignore network/server errors during logout
    }
  },

  // Refresh access token
  async refreshToken(refreshToken: string): Promise<{ access: string }> {
    const response = await apiClient.post<{ access: string }>('/auth/token/refresh/', {
      refresh: refreshToken,
    });
    return response.data;
  },
};

