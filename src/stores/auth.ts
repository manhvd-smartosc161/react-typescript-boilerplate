import { atom, selector } from 'recoil';
import { tokenService } from '@src/api/services';

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
  registrationId?: string;
  role?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

const getInitialAuthState = (): AuthState => {
  const token = tokenService.getToken();
  return {
    isAuthenticated: Boolean(token),
    user: null,
    token,
  };
};

export const authState = atom<AuthState>({
  key: 'authState',
  default: getInitialAuthState(),
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
