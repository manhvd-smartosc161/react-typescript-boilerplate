import { atom, selector } from 'recoil';
import { tokenService } from '@src/api/services';
import { User } from '@src/types';

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
