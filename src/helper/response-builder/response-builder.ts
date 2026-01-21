export class ResponseBuilder<T> {
  private success: boolean;
  private message: string;
  private data?: T;
  private error?: any;

  constructor() {
    this.success = true;
    this.message = "";
  }

  public setSuccess(success: boolean): this {
    this.success = success;
    return this;
  }

  public setMessage(message: string): this {
    this.message = message;
    return this;
  }

  public setData(data: T): this {
    this.data = data;
    return this;
  }

  public setError(error: any): this {
    this.error = error;
    return this;
  }

  public build() {
    return {
      success: this.success,
      message: this.message,
      data: this.data,
      error: this.error,
    };
  }

  public static success<T>(message: string, data?: T) {
    return new ResponseBuilder<T>()
      .setSuccess(true)
      .setMessage(message)
      .setData(data as T)
      .build();
  }

  public static error(message: string, error?: any) {
    return new ResponseBuilder()
      .setSuccess(false)
      .setMessage(message)
      .setError(error)
      .build();
  }
}
