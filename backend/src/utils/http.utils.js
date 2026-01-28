class HttpUtils {
  static INTERNAL_SERVER_ERROR_CODE = 500;
  static NOT_FOUND_ERROR_CODE = 404;
  static FORBIDDEN_ERROR_CODE = 403;
  static BAD_REQUEST_ERROR_CODE = 400;
  static UNAUTHORIZED_ERROR_CODE = 401;
  static OK_CODE = 200;
  static CREATED_CODE = 201;

  constructor() {}

  static success(res, status, content) {
    return res.status(status).json(content);
  }

  static error(res, error) {
    return res
      .status(error.status || HttpUtils.INTERNAL_SERVER_ERROR_CODE)
      .json({
        message: error.message || "Internal Server Error",
      });
  }
}

class HttpError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

export { HttpUtils, HttpError };
