class ApiResponse {
  constructor(statusCode, data = null, message = null) {
    this.statusCode = statusCode;
    this.message = message || (statusCode < 400 ? 'Success' : 'Error');
    this.data = data;
    this.success = statusCode < 400;
  }

  static success(statusCode,data = {}, message = 'Success') {
    return new ApiResponse(statusCode, data, message);
  }

  static error(statusCode, message = 'Error', data = null) {
    return new ApiResponse(statusCode, data, message);
  }
}

export default ApiResponse;
