import { Auth } from 'src/app/core/models/auth.model';
import { senderB } from 'src/mock';

export const authState = {
  currentUser: senderB as Auth,
};

export type AuthState = typeof authState;