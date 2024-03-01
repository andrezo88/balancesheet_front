import IInput from "../../interfaces/IInput";
import { useState } from "react";
import RegisterService from "./RegisterService";
import IUser from "../../interfaces/IUser";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoBS.svg"
import Navbar from "../../components/navbar/Navbar";

const RegisterUser = () => {

 const navigate = useNavigate();

 const [firstname, setFirstName] = useState<IInput>({
  value: "",
  invalid: false
 });
 const [lastname, setLastName] = useState<IInput>({
  value: "",
  invalid: false
 });
 const [password, setPassword] = useState<IInput>({
  value: "",
  invalid: false
 });
 const [email, setEmail] = useState<IInput>({
  value: "",
  invalid: false
 });

 function validateEmail(email: string) {
  const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  if (reg.test(email)) {
   return true;
  }
  else {
   return false;
  }
 }
 const service: RegisterService = new RegisterService();

 const registerValidation = (): boolean => {
  let valid = true;

  if (firstname.value === "") {
   setFirstName({ value: firstname.value, invalid: true });
   toast.error("Nome não pode ser vazio");
   valid = false;
  }
  if (lastname.value === "") {
   setLastName({ value: lastname.value, invalid: true });
   toast.error("Sobrenome não pode ser vazio");
   valid = false;
  }
  if (validateEmail(email.value) === false) {
   setEmail({ value: email.value, invalid: true });
   toast.error("Email não pode ser vazio ou inválido");
   valid = false;
  }
  if (password.value === "") {
   setPassword({ value: password.value, invalid: true });
   toast.error("Senha não pode ser vazio");
   valid = false;
  }
  return valid;
 };

 async function onSubmitHandler(event: React.FormEvent) {
  event.preventDefault();

  const user: IUser = {
   firstname: firstname.value,
   lastname: lastname.value,
   email: email.value,
   password: password.value,
  }

  try {
   if (registerValidation()) {
    await service.postUser(user);
    toast.success("Usuário criado com sucesso");
    navigate("/login");
   }
  } catch (error) {
   toast.error("Erro ao criar usuário");
  }
 }

 return (
  <section className="min-h-screen bg-gray-50 dark:bg-gray-900">
   <Navbar />
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
       <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-2">Nome</label>
       <Input
        required={true}
        invalid={firstname.invalid ?? false}
        placeholder="firstName"
        type="text"
        onChange={setFirstName}
       />
       <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-2">Sobrenome</label>
       <Input
        required={true}
        invalid={lastname.invalid ?? false}
        type="text"
        placeholder="LastName"
        onChange={(event) => {
         setLastName(event);
        }}
       />
       <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-2">Email</label>
        <Input
         required={true}
         invalid={email.invalid ?? false}
         type="text"
         placeholder="email"
         onChange={(event) => {
          setEmail(event);
         }}
        />
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-2">Senha</label>
        <Input
         required={true}
         invalid={password.invalid ?? false}
         type="password"
         placeholder="password"
         onChange={(event) => {
          setPassword(event);
         }}
        />
        <div className="pt-4">
         <Button
          text="Register"
          send={onSubmitHandler}
          parameters={[]}
         />
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </section>
 );
}
export default RegisterUser;