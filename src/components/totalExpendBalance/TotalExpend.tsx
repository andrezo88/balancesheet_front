/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import TotalService from "./TotalService";

interface TotalExpendbalanceProps {
 startDate: string;
 endDate: string;
 size: number;
}

const TotalExpendbalance: React.FC<TotalExpendbalanceProps> = ({ startDate, endDate, size }) => {
 const [total, setTotal] = useState<string>("");
 total
 useEffect(() => {
  const fetchTotalExpendBalance = async () => {
   try {
    const totalService = new TotalService();
    const response = await totalService.getTotalExpendBalance(startDate, endDate, size);
    response.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    setTotal(response.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) ?? 0);
    console.log(typeof (response))

   } catch (error) {
    console.error("Error fetching total expend balance:", error);
   }
  };

  fetchTotalExpendBalance();
 }, [startDate, endDate, size]);

 console.log(typeof (total))
 return (
  <div className="bg-gray-900">
   <span className="text-3xl font-bold text-white">Total em despesas: {total}</span>
  </div>
 );
}

export default TotalExpendbalance;