//@ts-check
export class ApiError extends Error {
  constructor(
    message = "Something is wents wrong",
    statuscode = 500,
    errors = [],
    code = "ERROR",
  ) {
    super(message);
    this.statuscode = statuscode;
    this.code = code;
    this.errors = errors;
  }
}
/**
 * @returns {never}
 */
export function throwApiError(message, statuscode, code) {
  throw new ApiError(message, statuscode, code);
}

/**
 * @returns {never}
 */
export function apiError(message, statuscode, code) {
  throw new ApiError(message, statuscode, code);
}
