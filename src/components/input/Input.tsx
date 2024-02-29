/* eslint-disable @typescript-eslint/no-explicit-any */
import IInput from "../../interfaces/IInput";
import { useState, useEffect } from "react";
import visu from "../../assets/visualizar.png";


interface InputProps {
 placeholder: string;
 type: string;
 required?: boolean;
 invalid?: boolean;
 onChange: (e: IInput) => void;
}

export const Input = ({
 placeholder,
 type,
 required,
 invalid,
 onChange
}: InputProps): any => {
 const [input, setInput] = useState("");
 const [typeTemp, setTypeTemp] = useState(type);
 const [error, setError] = useState(false);

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setInput(event.target.value);
  onChange({ value: event.target.value, invalid: error });
  console.log(event.target.value);
  if (event.target.value !== "") {
   setError(false);
  } else {
   setError(true);
  }
 };

 useEffect(() => {
  if (required) {
   if (invalid) {
    setError(true);
   } else {
    setError(false);
   }
  }
 }, [invalid, required]);

 const ShowButtom = () => {
  if (type === "password") {
   return (
    <button onClick={showPassword} className="relative w-5">
     <img src={visu} alt="Visualizar" className="relative inset-1" />
    </button>
   );
  } else {
   return <></>;
  }
 };

 const showPassword = () => {
  setTypeTemp(typeTemp === "password" ? "text" : "password");
 };


 return (
  <>
   <div className="input-text">
    <input
     className={
      error ? "caixa-texto" + " required" : "caixa-texto"
     }
     value={input}
     onChange={handleChange}
     placeholder={placeholder}
     type={typeTemp}
    />

    <ShowButtom />
   </div>
  </>
 );
}