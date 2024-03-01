/* eslint-disable @typescript-eslint/no-explicit-any */
interface ButtonProps {
  text: string;
  send: (...args: any) => any;
  parameters: any[];
}

//se o paramentro for passado será utilizado o evento e o paramentro, caso nao seja somente será utilizado o Event.
//o evento sempre será enviado na função.

export const Button = ({ text, send, parameters }: ButtonProps): any => {
  return (
    <>
      <button type="submit"
        className="
        w-full 
        text-white 
        bg-primary-600 
        hover:bg-primary-700 
        focus:ring-4 
        focus:outline-none 
        focus:ring-primary-300 
        font-medium 
        rounded-lg 
        text-sm 
        px-5 
        py-2.5 
        text-center 
        dark:bg-primary-600 
        dark:hover:bg-primary-700 
        dark:focus:ring-primary-800"
        onClick={(e) => send(e, ...parameters)}>{text}</button>
    </>
  );
};