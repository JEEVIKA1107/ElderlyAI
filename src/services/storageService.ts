import { ApplicationRecord, AccessibilitySettings, User } from '../types';

const STORAGE_KEYS = {
  CURRENT_USER: 'afa_current_user',
  ALL_USERS: 'afa_all_users',
  APPLICATIONS: 'afa_applications',
  ACTIVE_APP_ID: 'afa_active_app_id',
  SETTINGS: 'afa_accessibility_settings'
};

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 'normal',
  highContrast: false,
  language: 'en',
  readAloud: false
};

const INITIAL_DEMO_USERS: User[] = [
  {
    id: 'user-ramesh',
    name: 'Ramesh Kumar',
    emailOrPhone: 'ramesh@example.com',
    password: 'password123',
    createdAt: new Date().toISOString()
  }
];

export const storageService = {
  // Accessibility Settings
  getSettings(): AccessibilitySettings {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: AccessibilitySettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Unable to persist settings to localStorage', e);
    }
  },

  // Users (Mock DB)
  getUsers(): User[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ALL_USERS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(INITIAL_DEMO_USERS));
        return INITIAL_DEMO_USERS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_DEMO_USERS;
    }
  },

  saveUser(user: User): void {
    try {
      const users = this.getUsers();
      const existingIdx = users.findIndex(u => u.id === user.id || u.emailOrPhone.toLowerCase() === user.emailOrPhone.toLowerCase());
      if (existingIdx >= 0) {
        users[existingIdx] = user;
      } else {
        users.push(user);
      }
      localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(users));
    } catch (e) {
      console.warn('Failed to save user', e);
    }
  },

  getCurrentUser(): User | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user: User | null): void {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    } catch (e) {
      console.warn('Failed to update current user', e);
    }
  },

  // Applications
  getApplications(): ApplicationRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  getApplicationById(id: string): ApplicationRecord | null {
    const apps = this.getApplications();
    return apps.find(a => a.id === id) || null;
  },

  saveApplication(app: ApplicationRecord): void {
    try {
      const apps = this.getApplications();
      const idx = apps.findIndex(a => a.id === app.id);
      const updatedApp = { ...app, lastSaved: new Date().toISOString() };
      
      if (idx >= 0) {
        apps[idx] = updatedApp;
      } else {
        apps.unshift(updatedApp);
      }
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    } catch (e) {
      console.warn('Failed to save application', e);
    }
  },

  deleteApplication(id: string): void {
    try {
      const apps = this.getApplications().filter(a => a.id !== id);
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
    } catch (e) {
      console.warn('Failed to delete application', e);
    }
  },

  getActiveAppId(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.ACTIVE_APP_ID);
    } catch {
      return null;
    }
  },

  setActiveAppId(id: string | null): void {
    try {
      if (id) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_APP_ID, id);
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_APP_ID);
      }
    } catch (e) {
      console.warn('Failed to set active app id', e);
    }
  }
};
