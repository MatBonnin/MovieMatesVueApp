// store-types.d.ts
import { RootState as UserState, UserGetters } from "@/store/user";

export interface RootState {
  user: UserState;
}

export interface UserGetters {
  token: string;
  isAuthenticated: boolean;
}
