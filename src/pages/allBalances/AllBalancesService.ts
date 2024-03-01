import axios from "axios";

export default class AllBalancesService {

 private loginToken = JSON.parse(localStorage.getItem("token") || "{}");
 async getBalances(startDate: string, endDate: string, size?: number) {
  try {
   const response = await axios.get("http://localhost:8080/api/v1/balance", {
    headers: {
     Authorization: `Bearer ${this.loginToken.token}`
    },
    params: {
     startDate: startDate,
     endDate: endDate,
     size: size,
    }
   });
   return response.data.content;
  } catch (error) {
   console.error("Error creating balance:", error);
   throw error;
  }
 }
}