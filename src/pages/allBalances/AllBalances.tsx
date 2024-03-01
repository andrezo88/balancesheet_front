import { useEffect, useMemo, useState } from "react";
import IBalanceResponse from "../../interfaces/IBalanaceResponse";
import AllBalancesService from "./AllBalancesService";
import { Card } from "../../components/card/Card";
import { Input } from "../../components/input/Input";
import IInput from "../../interfaces/IInput";
import { Button } from "../../components/button/Button";
import moment from "moment";
import Navbar from "../../components/navbar/Navbar";
import TotalExpendbalance from "../../components/totalExpendBalance/TotalExpend";

const AllBalances = () => {

 const currentDate = moment().format('YYYY-MM-DD').toString();
 const lastWeek = moment(currentDate).subtract(17, 'days').format('YYYY-MM-DD').toString();

 const [balances, setBalances] = useState<IBalanceResponse[]>([]);
 const [startDate, setStartDate] = useState<IInput>({
  value: lastWeek
 });
 const [endDate, setEndDate] = useState<IInput>({
  value: currentDate
 });
 const [size, setSize] = useState(10);

 const service = useMemo(() => new AllBalancesService(), []);

 useEffect(() => {
  service.getBalances(startDate.value, endDate.value, size).then((response) => {
   setBalances(response);
  });
 }, []);

 async function onSubmitHandler(event: React.FormEvent) {
  event.preventDefault();

  try {
   await service.getBalances(startDate.value, endDate.value, size).then((response) => {
    setBalances(response);
   });
  } catch (error) {
   console.error("Error gettting balance:", error);
   throw error;
  }
 }

 return (
  <>
   <Navbar />
   <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="p-4 sm:flex sm:flex-col sm:justify-center sm:items-center">
     <h1 className="text-3xl font-bold text-center sm:py-16 md:py-20 lg:py-24 text-white">Todos os lançamentos de gastos.</h1>
     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-6 sm:pb-20">
      <label className="text-lg text-white">Data inicial:</label>
      <Input
       required={true}
       placeholder="Data inicial"
       type="date"
       invalid={startDate.invalid}
       onChange={setStartDate}
      />
      <label className="text-lg text-white">Data final:</label>
      <Input
       required={true}
       placeholder="Data final"
       type="date"
       invalid={endDate.invalid}
       onChange={setEndDate}
      />
      <div className="h-8 w-20">
       <Button
        text="Buscar"
        send={onSubmitHandler}
        parameters={[]}
       />
      </div>
     </div>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg: grid-cols-4 gap-4">
      {balances.map((balance) => {
       return (
        <Card
         key={balance.id}
         balance={balance}
        />
       )
      })}
     </div>
     <div className="mt-4 text-left">
      <TotalExpendbalance startDate={startDate.value} endDate={endDate.value} />
     </div>
    </div>
   </div>
  </>
 )
}

export default AllBalances;