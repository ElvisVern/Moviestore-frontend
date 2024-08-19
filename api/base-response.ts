export interface BaseResponse<T> {
  /**
   * The status of the response.
   */
  statusCode: string;

  /**
   * The message of the response.
   */
  message: string;

  /**
   * The data of the response.
   */
  data: T;
}