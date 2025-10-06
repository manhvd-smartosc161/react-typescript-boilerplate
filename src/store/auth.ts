import { atom, selector } from 'recoil';

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  surname: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

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

export const saveAuthState = (state: AuthState) => {
  try {
    localStorage.setItem('authState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving auth state:', error);
  }
};

export const authState = atom<AuthState>({
  key: 'authState',
  default: loadAuthState(),
});

export const currentUserState = selector<User | null>({
  key: 'currentUserState',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.user;
  },
});

export const isAuthenticatedState = selector<boolean>({
  key: 'isAuthenticatedState',
  get: ({ get }) => {
    const auth = get(authState);
    return auth.isAuthenticated;
  },
});
