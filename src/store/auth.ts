import { atom, selector } from 'recoil';

// User interface
export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  avatar?: string;
  department?: string;
  position?: string;
}

// Auth state interface
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

// Load auth state from localStorage
const loadAuthState = (): AuthState => {
  try {
    const savedAuth = localStorage.getItem('authState');
    if (savedAuth) {
      return JSON.parse(savedAuth);
    }
  } catch (error) {
    console.error('Error loading auth state:', error);
  }
  return {
    isAuthenticated: false,
    user: null,
    token: null,
  };
};

// Save auth state to localStorage
export const saveAuthState = (state: AuthState) => {
  try {
    localStorage.setItem('authState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving auth state:', error);
  }
};

// Main auth atom
export const authState = atom<AuthState>({
  key: 'authState',
  default: loadAuthState(),
});

// Selector for current user
export const currentUserState = selector<User | null>({
  key: 'currentUserState',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.user;
  },
});

// Selector for authentication status
export const isAuthenticatedState = selector<boolean>({
  key: 'isAuthenticatedState',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.isAuthenticated;
  },
});
