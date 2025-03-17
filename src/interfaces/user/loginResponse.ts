import { UserData } from "./userData";

export interface LoginResponse {
  user: UserData;
  token: string;
}
