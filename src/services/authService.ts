import { User } from '../types';
import { storageService } from './storageService';

export interface AuthResponse {
  success: boolean;
  user?: User;
  errorMessage?: string;
}

export const authService = {
  getCurrentUser(): User | null {
    return storageService.getCurrentUser();
  },

  login(emailOrPhone: string, password?: string): AuthResponse {
    const cleanIdentifier = emailOrPhone.trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    const users = storageService.getUsers();
    const found = users.find(u => 
      u.emailOrPhone.toLowerCase() === cleanIdentifier && 
      (!cleanPassword || u.password === cleanPassword)
    );

    if (found) {
      storageService.setCurrentUser(found);
      return { success: true, user: found };
    }

    return {
      success: false,
      errorMessage: "We couldn't log you in. Please check your email or phone number and password."
    };
  },

  register(name: string, emailOrPhone: string, password?: string): AuthResponse {
    const cleanName = name.trim();
    const cleanIdentifier = emailOrPhone.trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanName) {
      return { success: false, errorMessage: "Please enter your full name." };
    }

    if (!cleanIdentifier) {
      return { success: false, errorMessage: "Please enter your email address or phone number." };
    }

    const users = storageService.getUsers();
    const existing = users.find(u => u.emailOrPhone.toLowerCase() === cleanIdentifier);
    if (existing) {
      return {
        success: false,
        errorMessage: "An account already exists with this email or phone number. Please log in instead."
      };
    }

    const newUser: User = {
      id: 'user-' + Date.now(),
      name: cleanName,
      emailOrPhone: cleanIdentifier,
      password: cleanPassword,
      createdAt: new Date().toISOString()
    };

    storageService.saveUser(newUser);
    storageService.setCurrentUser(newUser);

    return {
      success: true,
      user: newUser
    };
  },

  logout(): void {
    storageService.setCurrentUser(null);
    storageService.setActiveAppId(null);
  }
};
