import { Auth } from 'src/app/core/models/auth.model';

export const authState = {
  currentUser: null as Auth | null,
};

export type AuthState = typeof authState;