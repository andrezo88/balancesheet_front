import "./Login.css";
import IInput from "../../interfaces/IInput";
import { useState } from "react";
import LoginService from "./LoginService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import IUser from "../../interfaces/IUser";
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
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
  <main className="flex flex-col text-center">
   <Navbar />
   <ToastContainer />
   <p className="text-3xl font-bold">Login</p>
   <form className=" flex">
    <Input
     required={true}
     placeholder="Email"
     type="email"
     invalid={email.invalid}
     onChange={setEmail}
    />
    <Input
     required={true}
     placeholder="Senha"
     type="password"
     invalid={password.invalid}
     onChange={setPassword}
    />
    <Button
     text="Login"
     send={onSubmitHandler}
     parameters={[]}
    />
   </form>
  </main>
 );
}

export default LoginUser;
