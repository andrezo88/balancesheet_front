/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import TotalService from "./TotalService";

interface TotalExpendbalanceProps {
 startDate: string;
 endDate: string;
}

const TotalExpendbalance: React.FC<TotalExpendbalanceProps> = ({ startDate, endDate }) => {
 const [total, setTotal] = useState<any>(0);

 useEffect(() => {
  const fetchTotalExpendBalance = async () => {
   try {
    const totalService = new TotalService();
    const response = await totalService.getTotalExpendBalance(startDate, endDate);
    console.log("Response from TotalService:", response);
    setTotal(response); // Adicione console.log aqui para verificar o valor sendo definido
   } catch (error) {
    console.error("Error fetching total expend balance:", error);
   }
  };

  fetchTotalExpendBalance();
 }, [startDate, endDate]);

 console.log("Total in component state:", total);

 return (
  <div className="totalExpendBalance">
   <span className="totalExpendBalance">R$: {total}</span>
  </div>
 );
}

export default TotalExpendbalance;