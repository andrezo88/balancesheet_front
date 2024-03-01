import axios from "axios";
import IBalance from "../../interfaces/IBalanceRequest";

export default class AddBalanceService {

 private loginToken = JSON.parse(localStorage.getItem("token") || "{}");

 async postBalance(balance: IBalance) {
  try {
   const response = await axios.post("http://localhost:8080/api/v1/balance", balance, {
    headers: {
     Authorization: `Bearer ${this.loginToken.token}`
    }
   }).then((response) => {
    return response.data;
   });
   return response;
  } catch (error) {
   console.error("Error creating balance:", error);
   throw error;
  }
 }
}