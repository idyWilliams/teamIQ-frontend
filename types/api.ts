export interface APIResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}
