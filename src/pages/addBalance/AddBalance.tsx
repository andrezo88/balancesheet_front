import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IInput from "../../interfaces/IInput";
import AddBalanceService from "./AddBalanceService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import IBalanceRequest from "../../interfaces/IBalanceRequest";
import Navbar from "../../components/navbar/Navbar";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import logo from "../../assets/logoBS.svg"

const AddBalance = () => {
  const service = new AddBalanceService();
  const navigate = useNavigate();
  const typeEnum: Array<string> = ["DEBIT", "CREDIT", "PIX", "CASH"];

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

  useEffect(() => {
    const updateAmount = () => {
      if (amount.value.includes(',')) {
        setAmount(prevAmount => ({
          ...prevAmount,
          value: prevAmount.value.replace(',', '.')
        }));
      }
    };
    updateAmount();
  }, [amount.value]);

  const addBalanceValidation = (): boolean => {
    let valid = true;
    if (amount.value === "" || isNaN(Number(amount.value)) || Number(amount.value) <= 0) {
      setAmount({ value: amount.value.replace(",", "."), invalid: true });
      toast.error("Valor inválido");
      valid = false;
    }
    if (description.value === "" || description.value.length > 50) {
      setDescription({ value: description.value, invalid: true });
      toast.error("Descricão inválida dever ter no maximo 50 caracteres");
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
      amount: Number((amount.value).replace(",", ".")),
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
      <Navbar />
      <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <ToastContainer />
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
            BalanceSheets
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Faça o cadastro de uma nova conta
              </h1>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-2">Valor da despesa: </label>
                <div className="mx-auto">
                  <Input
                    required={true}
                    invalid={amount.invalid ?? false}
                    placeholder="firstName"
                    type="text"
                    onChange={setAmount}
                  />
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-2">Descrição da despesa: </label>
                <div className="mx-auto">
                  <Input
                    required={true}
                    placeholder="Descrição"
                    type="text"
                    invalid={description.invalid}
                    onChange={setDescription}
                  />
                </div>
                <div className="sm:w-[300px] md:w-[380px]">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-2">Descrição da despesa: </label>
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
                        w-full
                        p-2.5 
                        dark:bg-gray-700 
                        dark:border-gray-600 
                        dark:placeholder-gray-400 
                        dark:text-white 
                        dark:focus:ring-blue-500 
                        dark:focus:border-blue-500
                        "
                    onChange={(event) => setType({ value: event.target.value, invalid: false })}
                  >
                    {typeEnum.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-2">Descrição da despesa: </label>
                <div className="mx-auto">
                  <Input
                    required={true}
                    placeholder="Data"
                    type="date"
                    invalid={date.invalid}
                    onChange={setDate}
                  />
                </div>
                <div className="pt-6">
                  <Button
                    text="Adicionar"
                    send={onSubmitHandler}
                    parameters={[]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
}
export default AddBalance;