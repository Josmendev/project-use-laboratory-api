export interface ApiResponse<T> {
  ok: boolean;
  data: T;
  message?: string;
  status?: number;
}
