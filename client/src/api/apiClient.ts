import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { QueryClient } from 'react-query';

export class ApiClient {
  private baseURL: string = 'http://localhost:3001/api/v1'; //TODO: Make this env variable

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.request<T>({
        baseURL: this.baseURL,
        ...config,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
    queryParams?: any,
  ): Promise<T> {
    return (await queryParams)
      ? this.request<T>({ url, method: 'GET', params: queryParams, ...config })
      : this.request<T>({ url, method: 'GET', ...config });
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return await this.request<T>({ url, method: 'POST', data, ...config });
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return await this.request<T>({ url, method: 'PUT', data, ...config });
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return await this.request<T>({ url, method: 'DELETE', ...config });
  }
}

export const queryClient = new QueryClient(); // Hooks for managing, caching and syncing asynchronous and remote data in React
