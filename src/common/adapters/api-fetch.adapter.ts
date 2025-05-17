import { ApiResponse } from '../interfaces/api-response.interface';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ApiFetchAdapter implements HttpAdapter {
  constructor() {}

  async post<T>(url: string, body: any, apiKey?: string): Promise<T> {
    const headers = this.getHeaders(url, apiKey);
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    return this.handleApiResponse<T>(res);
  }

  private getHeaders(url: string, apiKey?: string): HeadersInit {
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;
    return headers;
  }

  private async handleApiResponse<T>(res: Response): Promise<T> {
    const data = (await res.json()) as ApiResponse<T>;
    if (!res.ok || !data?.ok) {
      throw new HttpException(
        data?.message || 'Error en la API externa',
        res.status,
      );
    }
    return data.data;
  }
}
