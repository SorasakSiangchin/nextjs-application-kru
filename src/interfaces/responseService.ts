export interface ResponseService<T> {
  success: boolean;
  message: string;
  data: T | null;
}
