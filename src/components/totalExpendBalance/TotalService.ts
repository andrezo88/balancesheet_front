import axios from "axios";

export default class TotalService {
 private loginToken = JSON.parse(localStorage.getItem("token") || "{}");

 async getTotalExpendBalance(startDate: string, endDate: string) {
  try {
   const response = await axios.get("http://localhost:8080/api/v1/balance-total", {
    headers: {
     Authorization: `Bearer ${this.loginToken.token}`
    },
    params: {
     startDate: startDate,
     endDate: endDate,
     userId: localStorage.getItem("userId") ?? "",
    }
   });
   return response.data;
  } catch (error) {
   console.error("Error fetching total expend balance:", error);
   throw error;
  }
 }
}