import IUser from "../../interfaces/IUser";
import axios from "axios";

export default class CadastroService {
 async postUser(user: IUser) {
  try {
   const response = await axios.post("http://localhost:8080/api/v1/auth/register", user, {
   });
   return response.data;
  } catch (error) {
   console.error("Error creating user:", error);
   throw error;
  }
 }
}
