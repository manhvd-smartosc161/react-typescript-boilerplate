import { atom, selector } from 'recoil';

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  surname: string;
  language?: string;
  emailNotifications?: boolean;
  marketingNotifications?: boolean;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isAuthenticated: false,
    user: null,
    token: null,
  },
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
