import { Auth } from './auth.model';

export interface Message {
  id: string;
  sender: Auth;
  message?: string;
  images?: string[];
  files?: string[];
  createdAt: Date;
}