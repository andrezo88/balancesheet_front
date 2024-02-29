import IBalanceResponse from "../../interfaces/IBalanaceResponse"

interface Props {
 balance?: IBalanceResponse
}

interface CardProps {
 id: string,
 amount: number,
 description: string,
 type: string,
 date: string
}

const dataReturned = (props: Props): CardProps => {
 const { balance } = props
 const data: CardProps = {
  id: balance?.id ?? "",
  amount: balance?.amount ?? 0,
  description: balance?.description ?? "",
  type: balance?.type ?? "",
  date: balance?.date ?? ""
 }
 return data;
}

export const Card = (props: Props) => {
 const data = dataReturned(props)
 return (
  <div className="col-span-1 p-4 border border-gray-300 rounded-lg shadow-md">
   <div className="grid grid-rows-5 gap-2">
    <span className="text-gray-500">Id: {data.id}</span>
    <span className="text-gray-500">Amount: {data.amount}</span>
    <span className="text-gray-500">Description: {data.description}</span>
    <span className="text-gray-500">Type: {data.type}</span>
    <span className="text-gray-500">Date: {data.date}</span>
   </div>
  </div>
 )
}