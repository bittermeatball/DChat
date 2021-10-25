import { Auth } from './auth.model';

export interface Message {
  id?: string;
  sender: Auth | null;
  message?: string | null;
  images?: string[];
  files?: string[];
  createdAt?: Date;
}