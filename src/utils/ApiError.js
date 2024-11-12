class ApiError extends Error {
  constructor(
    // kya kya lena hai ( agar kuch nahi hai to default -> (=) <- se eak default le liya )
    statusCode,
    message = "something went wrong in APIERROR",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = data || {};
    this.errors = errors;
    this.success = false;
    this.message = message;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
