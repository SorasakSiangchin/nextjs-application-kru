export interface RegisterRequest {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age?: number;
}
