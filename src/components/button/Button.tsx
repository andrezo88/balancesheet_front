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
   <button type="submit" className="botao" onClick={(e) => send(e, ...parameters)}>{text}</button>
  </>
 );
};