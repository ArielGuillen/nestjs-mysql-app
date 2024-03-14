import { HttpException } from "@nestjs/common";

export class Response<T> {
  public data: any;
  public error: string;
  public status: number;

  constructor(status: number, data: T, error?: string) {
    this.data = data;
    this.error = error;
    this.status = status;
  }

  public static success<T>(data: T, status: number = 200): Response<T> {
    return new Response(status, data);
  }

  public static error<T>(error: string, status: number = 500): Response<T> {
    return new Response(status, null, error);
  }

  public static exception<T>(error: string, status: number = 500): Response<T> {
    throw new HttpException(error, status);
  }
}
