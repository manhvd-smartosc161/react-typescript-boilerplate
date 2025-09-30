import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import {
  authState,
  currentUserState,
  isAuthenticatedState,
  saveAuthState,
  mockUser,
  User,
} from '@src/store';

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const currentUser = useRecoilValue(currentUserState);
  const isAuthenticated = useRecoilValue(isAuthenticatedState);
  const navigate = useNavigate();

  // Login function - simplified to accept any credentials
  const login = (username: string, password: string): boolean => {
    // Simple validation: just check if fields are not empty
    if (username.trim() && password.trim()) {
      const newAuthState = {
        isAuthenticated: true,
        user: mockUser,
        token: `mock-token-${mockUser.id}-${Date.now()}`,
      };

      setAuth(newAuthState);
      saveAuthState(newAuthState);
      return true;
    }

    return false;
  };

  // Logout function
  const logout = () => {
    const newAuthState = {
      isAuthenticated: false,
      user: null,
      token: null,
    };

    setAuth(newAuthState);
    saveAuthState(newAuthState);
    navigate('/login');
  };

  // Update user profile
  const updateUserProfile = (updates: Partial<User>) => {
    if (auth.user) {
      const updatedUser = { ...auth.user, ...updates };
      const newAuthState = {
        ...auth,
        user: updatedUser,
      };

      setAuth(newAuthState);
      saveAuthState(newAuthState);
    }
  };

  return {
    // State
    auth,
    currentUser,
    isAuthenticated,

    // Actions
    login,
    logout,
    updateUserProfile,
  };
};

export default useAuth;
