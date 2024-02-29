import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IInput from "../../interfaces/IInput";
import AddBalanceService from "./AddBalanceService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import IBalanceRequest from "../../interfaces/IBalanceRequest";
import Navbar from "../../components/navbar/Navbar";

const AddBalance = () => {
 const service = new AddBalanceService();
 const navigate = useNavigate();

 const [amount, setAmount] = useState<IInput>({
  value: "",
  invalid: false
 });
 const [description, setDescription] = useState<IInput>({
  value: "",
  invalid: false
 });
 const [type, setType] = useState<IInput>({
  value: "",
  invalid: false
 });
 const [date, setDate] = useState<IInput>({
  value: "",
  invalid: false
 });

 const addBalanceValidation = (): boolean => {
  let valid = true;
  if (amount.value === "" || isNaN(Number(amount.value)) || Number(amount.value) <= 0) {
   setAmount({ value: amount.value, invalid: true });
   toast.error("Valor inválido");
   valid = false;
  }
  if (description.value === "") {
   setDescription({ value: description.value, invalid: true });
   toast.error("Descricão inválida");
   valid = false;
  }
  if (type.value === "") {
   setType({ value: type.value, invalid: true });
   toast.error("Tipo inválido");
   valid = false;
  }
  if (date.value === "") {
   setDate({ value: date.value, invalid: true });
  }
  return valid;
 };

 async function onSubmitHandler(event: React.FormEvent) {
  event.preventDefault();
  const balance: IBalanceRequest = {
   amount: Number(amount.value),
   description: description.value,
   type: type.value,
   date: date.value,
   userId: localStorage.getItem("userId") ?? ""
  }

  try {
   if (addBalanceValidation()) {
    await service.postBalance(balance);
    toast.success("Saldo adicionado com sucesso");
    navigate("/add-balance");
   }
  } catch (error) {
   toast.error("Erro ao adicionar saldo");
  }
 }

 return (
  <>
   <ToastContainer />
   <Navbar />
   <div className="flex flex-col justify-center items-center h-screen">
    <form
     className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
     onSubmit={onSubmitHandler}
    >
     <div className="mb-4">
      <label
       className="block text-gray-700 text-sm font-bold mb-2"
       htmlFor="amount"
      >
       Valor
      </label>
      <input
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       id="amount"
       type="number"
       placeholder="Valor"
       onChange={(event) => setAmount({ value: event.target.value, invalid: false })}
      />
     </div>
     <div className="mb-4">
      <label
       className="block text-gray-700 text-sm font-bold mb-2"
       htmlFor="description"
      >
       Descricão
      </label>
      <input
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       id="description"
       type="text"
       placeholder="Descricão"
       onChange={(event) => setDescription({ value: event.target.value, invalid: false })}
      />
     </div>
     <div className="mb-4">
      <label
       className="block text-gray-700 text-sm font-bold mb-2"
       htmlFor="type"
      >
       Tipo
      </label>
      <input
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       id="type"
       type="text"
       placeholder="Tipo"
       onChange={(event) => setType({ value: event.target.value, invalid: false })}
      />
     </div>
     <div className="mb-4">
      <label
       className="block text-gray-700 text-sm font-bold mb-2"
       htmlFor="date"
      >
       Data
      </label>
      <input
       className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
       id="date"
       type="date"
       placeholder="Data"
       onChange={(event) => setDate({ value: event.target.value, invalid: false })}
      />
     </div>
     <div className="flex items-center justify-between">
      <button
       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
       type="submit"
      >
       Adicionar
      </button>
     </div>
    </form>
   </div>
  </>
 );
}
export default AddBalance;