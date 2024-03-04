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

 const sizeEnum = [10, 20, 50, 100];
 const currentDate = moment().format('YYYY-MM-DD').toString();
 const lastWeek = moment(currentDate).subtract(7, 'days').format('YYYY-MM-DD').toString();

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-6 w-32">
       <Input
        required={true}
        placeholder="Data inicial"
        type="date"
        invalid={startDate.invalid}
        onChange={setStartDate}
       />
      </div>
      <label className="text-lg text-white">Data final:</label>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-6 w-32">
       <Input
        required={true}
        placeholder="Data final"
        type="date"
        invalid={endDate.invalid}
        onChange={setEndDate}
       />
      </div>
      <label className="text-lg text-white">Exibir por página:</label>
      <select
       className="
       bg-gray-50 
       border 
       border-gray-300 
       text-gray-900 
       sm:text-sm 
       rounded-lg 
       focus:ring-primary-600 
       focus:border-primary-600 
       block 
       p-2.5 
       dark:bg-gray-700 
       dark:border-gray-600 
       dark:placeholder-gray-400 
       dark:text-white 
       dark:focus:ring-blue-500 
       dark:focus:border-blue-500
       w-32
       sm:w-20
       md:w-20
       lg:w-20
       "
       onChange={(e) => setSize(parseInt(e.target.value))}
      >
       {sizeEnum.map((size) => {
        return (
         <option
          key={size}
          value={size}
         >
          {size}
         </option>
        )
       })}
      </select>
      <div className="w-32 sm:w-32 md:w-32 lg:w-32">
       <Button
        text="Buscar"
        send={onSubmitHandler}
        parameters={[]}
       />
      </div>
     </div>
     <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <TotalExpendbalance startDate={startDate.value} endDate={endDate.value} size={size} />
     </div>
    </div>
   </div >
  </>
 )
}

export default AllBalances;