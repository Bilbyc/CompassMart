export default class BadRequestError extends Error {
  public readonly statusCode:number

  constructor (message: string) {
    super(message)
    this.name = 'Bad Request'
    this.statusCode = 400
  }
}
