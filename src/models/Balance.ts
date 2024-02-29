import IBalanceRequest from "../interfaces/IBalanceRequest"

export default class balance {
 id?: string
 amount: number
 description: string
 type: string
 date?: string
 userId: string

 constructor(body: IBalanceRequest) {
  this.amount = body.amount
  this.description = body.description
  this.type = body.type
  this.date = body.date
  this.userId = body.userId
 }
}

