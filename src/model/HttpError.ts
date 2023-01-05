class HttpError extends Error {
  status: number
  message: string
  detail: any
  constructor(status: number, message: string, detail=null) {
    super(message);
    this.status = status
    this.message = message
    this.detail = detail
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

export default HttpError