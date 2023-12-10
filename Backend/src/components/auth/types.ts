import { IUser } from '../users/types';

export interface AuthResponse {
	token? : string;
  user: IUser;
  message: string;
}

