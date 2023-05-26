export class NoUserRefError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NoUserRefError'
  }
}
