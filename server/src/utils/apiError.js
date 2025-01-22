class ApiError extends Error {
    constructor(statusCode, message = 'Something went wrong', error = [], stack = '') {
      super(message); // Call the parent Error constructor with the message
      this.statusCode = statusCode;
      this.data = null;
      this.success = false;
      this.error = error;
  
      // Handle the stack trace
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor); // Corrected 'consttructor' to 'constructor'
      }
    }
  }
  
  export default ApiError;
  