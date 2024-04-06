import { IoAlertCircleOutline } from "react-icons/io5";

export function ErrorMenssage({errorMenssage}) {
  return (
    <div className="flex gap-2 items-center text-danger-600 mb-3">
      <IoAlertCircleOutline size={20}/>
      <span>{errorMenssage}</span>
    </div>
  )
}