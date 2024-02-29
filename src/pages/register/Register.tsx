import IInput from "../../interfaces/IInput";
import { useState } from "react";
import RegisterService from "./RegisterService";
import IUser from "../../interfaces/IUser";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { Input } from "../../components/input/Input";
import { Button } from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
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
  console.log(user);
 }

 return (
  <main>
   <ToastContainer />
   <Navbar />
   <h1 className="container=mx-auto text-3xl font-bold text-center">Register User</h1>
   <form onSubmit={onSubmitHandler} className="gap-4 w-1/3 mx-auto">
    <Input
     required={true}
     invalid={firstname.invalid ?? false}
     placeholder="firstName"
     type="text"
     onChange={setFirstName}
    />
    <Input
     required={true}
     invalid={lastname.invalid ?? false}
     type="text"
     placeholder="LastName"
     onChange={(event) => {
      setLastName(event);
     }}
    />
    <Input
     required={true}
     invalid={email.invalid ?? false}
     type="text"
     placeholder="email"
     onChange={(event) => {
      setEmail(event);
     }}
    />
    <Input
     required={true}
     invalid={password.invalid ?? false}
     type="password"
     placeholder="password"
     onChange={(event) => {
      setPassword(event);
     }}
    />
    <Button
     text="Register"
     send={onSubmitHandler}
     parameters={[]}
    />
   </form>
  </main>
 );
}
export default RegisterUser;