/* eslint-disable @typescript-eslint/no-explicit-any */
import IBalanceResponse from "../../interfaces/IBalanaceResponse"

interface Props {
  balance?: IBalanceResponse
}

interface CardProps {
  id: string,
  amount: string | number,
  description: string,
  type: string,
  date: string
}

const dataReturned = (props: Props): CardProps => {
  const { balance } = props
  const data: CardProps = {
    id: balance?.id ?? "",
    amount: balance?.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) ?? 0,
    description: balance?.description ?? "",
    type: balance?.type ?? "",
    date: balance?.date ?? ""
  }
  return data;
}

export const Card = (props: Props) => {
  const data = dataReturned(props)
  return (

    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Descrição:<br /> {data.description}</h5>
      <p className="font-normal text-gray-700 dark:text-gray-200"><b>Valor da despesa:</b> {data.amount}</p>
      <p className="font-normal text-gray-700 dark:text-gray-200"><b>Data da despesa:</b> {data.date}</p>
      <p className="font-normal text-gray-700 dark:text-gray-200"><b>Tipo do pagamento:</b> {data.type}</p>
    </div>

  )
}
