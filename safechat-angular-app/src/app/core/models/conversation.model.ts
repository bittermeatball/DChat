import { Auth } from './auth.model';
import { Message } from './message.model';

export interface Conversation {
  id: string;
  title: string;
  thumbnail?: string;
  messages: Message[];
  images: string[];
  files: string[];
  lastMessage: Message;
  lastMessageSender: Auth;
  lastMessageAt: Date,
}
