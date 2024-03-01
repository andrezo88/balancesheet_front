/* eslint-disable @typescript-eslint/no-explicit-any */
import IInput from "../../interfaces/IInput";
import { useState, useEffect } from "react";


interface InputProps {
  placeholder: string;
  type: string;
  required?: boolean;
  invalid?: boolean;
  onChange: (e: IInput) => void;
}

export const Input = ({
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

  return (
    <>
      <div className="sm:w-[300px] md:w-[380px]">
        <div
          className="
      absolute 
      grid
      w-5
      h-5
      place-items-center
      text-blue-gray-100
      top-2/4
      right-3
      -translate-y-2/4"
        >
        </div>
        <input
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
      dark:focus:border-blue-500"
          value={input}
          onChange={handleChange}
          type={typeTemp}
        />
      </div>
    </>
  );
}