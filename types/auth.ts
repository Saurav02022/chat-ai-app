export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  provider: 'google';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthActions {
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (user: User) => void;
  logout: () => void;
  reset: () => void; // For testing purposes
}

export type AuthStore = AuthState & AuthActions;
