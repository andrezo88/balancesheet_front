import IUser from "../../interfaces/IUser";
import axios from "axios";

export default class CadastroService {
 async login(user: IUser) {
  try {
   const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate", user, {
   }).then((response) => {
    localStorage.setItem("token", JSON.stringify(response.data));
    console.log(response.data);
    return response.data;
   })
   return response;
  } catch (error) {
   console.error("Error creating user:", error);
   throw error;
  }
 }
}