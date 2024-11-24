export class CustomError extends Error {
  public category: string;
  public code: string;

  constructor(message: string, category: string, code: string) {
    super(message);
    this.category = category;
    this.code = code;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}
