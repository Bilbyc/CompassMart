export default class NotFoundError extends Error {

    public readonly statusCode:number
  
    constructor (message: string) {
      super(message)
      this.name = 'Not Found'
      this.statusCode = 404
  
    
    }
}
  