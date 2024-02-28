class CustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number,
  ) {
    super(message);
  }

  /**
   * The server cannot or will not process the request due to an apparent client error
   * (e.g., malformed request syntax, size too large, invalid request message framing,
   * or deceptive request routing).
   * 
   * @param message Custom error message
   */
  public static badRequest(message: string) {
    return new CustomError(message, 400);
  };

  /**
   * Similar to 403 Forbidden, but specifically for use when authentication
   * is required and has failed or has not yet been provided.
   * The response must include a WWW-Authenticate header
   * field containing a challenge applicable to the requested resource.
   * 
   * @param message Custom error message
   */
  public static unAuthorized(message: string) {
    return new CustomError(message, 401);
  };

  /**
   * The request was a valid request, but the server is refusing to respond to it.
   * The user might not have the necessary permissions for a resource,
   * or may need an account of some sort.
   * 
   * @param message Custom error message
   */
  public static forbidden(message: string) {
    return new CustomError(message, 403);
  };

  /**
   * The requested resource could not be found but may be available in the future.
   * Subsequent requests by the client are permissible.
   * 
   * @param message Custom error message
   */
  public static notFound(message: string) {
    return new CustomError(message, 404);
  };

  /**
   * A generic error message, given when an unexpected condition was encountered
   * and no more specific message is suitable.
   * 
   * @param message Custom error message
   */
  public static internalServer(message: string) {
    console.log('Error:', message);
    return new CustomError(message, 500);
  };
}

export default CustomError;
