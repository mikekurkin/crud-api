export class HttpError extends Error {
  constructor(message = 'Bad Request') {
    super(message);
    this.name = 'BadRequestError';
    this.code = 400;
  }
  code;
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad Request') {
    super(message);
    this.name = 'BadRequestError';
    this.code = 400;
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(message);
    this.name = 'NotFoundError';
    this.code = 404;
  }
}

export class ServerError extends HttpError {
  constructor(message = 'Server Error') {
    super(message);
    this.name = 'ServerError';
    this.code = 500;
  }
}
