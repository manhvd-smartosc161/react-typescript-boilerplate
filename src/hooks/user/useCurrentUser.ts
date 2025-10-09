import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { authService, tokenService } from '@src/api/services';
import { authState } from '@src/stores';
import { authKeys } from '@src/constants';

export const useCurrentUser = () => {
  const token = tokenService.getToken();
  const setAuthState = useSetRecoilState(authState);

  useEffect(() => {
    if (token) {
      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: true,
        token,
      }));
    }
  }, [token, setAuthState]);

  const query = useQuery({
    queryKey: authKeys.user(),
    queryFn: () => {
      return authService.getCurrentUser();
    },
    enabled: Boolean(token),
    staleTime: 5 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.status === 401 || error?.code === 401) {
        return false;
      }
      return failureCount < 1;
    },
  });

  useEffect(() => {
    if (query.data && token && !query.isError) {
      const newAuthState = {
        isAuthenticated: true,
        user: query.data,
        token,
      };

      setAuthState(newAuthState);
    } else if (query.isError || (!token && !query.isLoading)) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        token: null,
      });
      if (token && query.isError) {
        tokenService.removeToken();
      }
    }
  }, [query.data, query.isError, token, setAuthState]);

  return query;
};
