import IInput from "../../interfaces/IInput";
import { useState } from "react";
import LoginService from "./LoginService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import IUser from "../../interfaces/IUser";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoBS.svg"
import Navbar from "../../components/navbar/Navbar";

const LoginUser = () => {
 const navigate = useNavigate();
 const [email, setEmail] = useState<IInput>({
  value: "",
  invalid: false
 });
 const [password, setPassword] = useState<IInput>({
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

 const service = new LoginService();

 const loginValidation = (): boolean => {
  let valid = true;
  if (validateEmail(email.value) === false) {
   setEmail({ value: email.value, invalid: true });
   toast.error("Email inválido");
   valid = false;
  }
  if (password.value === "") {
   setPassword({ value: password.value, invalid: true });
   toast.error("Senha inválida");
   valid = false;
  }
  return valid;
 };

 async function onSubmitHandler(event: React.FormEvent) {
  event.preventDefault();
  const user: IUser = {
   email: email.value,
   password: password.value
  }

  try {
   if (loginValidation()) {
    await service.login(user);
    toast.success("Login efetuado com sucesso");
    navigate("/add-balance");
   }
  } catch (error) {
   toast.error("Email ou senha inválidos");
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
       Faça o login na sua conta
      </h1>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
      <Input
       required={true}
       placeholder="Email"
       type="email"
       invalid={email.invalid}
       onChange={setEmail}
      />
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
      <Input
       required={true}
       placeholder="Password"
       type="password"
       invalid={password.invalid}
       onChange={setPassword}
      />
      <Button
       text="Login"
       send={onSubmitHandler}
       parameters={[]}
      />
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
       Ainda não tem uma conta? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">  Registre</a>
      </p>
     </div>
    </div>
   </div>
  </section>
 );
}

export default LoginUser;
