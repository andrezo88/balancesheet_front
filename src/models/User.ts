import IUser from "../interfaces/IUser"

export default class User {
 id?: string;
 firstname?: string;
 lastname?: string;
 email?: string;
 password?: string;

 constructor(body: IUser) {
  this.firstname = body.firstname;
  this.lastname = body.lastname;
  this.email = body.email;
  this.password = body.email;
 }
}
