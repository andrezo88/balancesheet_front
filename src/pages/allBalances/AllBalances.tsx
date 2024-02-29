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
 }, [service, startDate.value, endDate.value, size]);

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
   <div className="flex justify-center gap-6">
    <span>Data inicial:</span>
    <Input
     required={true}
     placeholder="Data inicial"
     type="date"
     invalid={startDate.invalid}
     onChange={setEndDate}
    />
    <span>Data final:</span>
    <Input
     required={true}
     placeholder="Data final"
     type="date"
     invalid={endDate.invalid}
     onChange={setStartDate}
    />
   </div>
   <div className="flex justify-center items-center gap-6 ">
    <div className="bg-blue-500 text-white rounded-md px-4 py-2">
     <Button
      text="Buscar"
      send={onSubmitHandler}
      parameters={[]}
     />
    </div>
   </div>
   <div className="grid grid-cols-3 gap-4">
    {balances.map((balance) => {
     return (
      <Card
       key={balance.id}
       balance={balance}
      />
     )
    })}
   </div>
   <div>
    <TotalExpendbalance startDate={startDate.value} endDate={endDate.value} />
   </div>
  </>
 )
}

export default AllBalances;