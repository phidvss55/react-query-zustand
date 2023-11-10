export class ResponseData {
  readonly status: number;
  readonly message: string;
  readonly data: any;
  readonly code?: number;
  readonly reason?: string;

  constructor(status: number, data: any, message?: string, code?: number) {
    this.status = status;
    this.message = message || 'Success';
    this.data = data;
    this.code = code;
  }
}

export class ResponseDataWithPaging extends ResponseData {
  readonly currentPage: number;
  readonly totalPages: number;

  constructor(
    status: number,
    data: any,
    currentPage: number,
    total: number,
    message?: string,
    code?: number,
  ) {
    super(status, data, message, code);
    this.currentPage = currentPage;
    this.totalPages = total;
  }
}
