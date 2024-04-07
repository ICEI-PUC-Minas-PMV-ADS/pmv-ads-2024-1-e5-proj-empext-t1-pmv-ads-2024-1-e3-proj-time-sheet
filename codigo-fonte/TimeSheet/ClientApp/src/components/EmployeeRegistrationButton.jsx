import { FaUserPlus } from "react-icons/fa";

export function EmployeeRegistrationButton() {
  return (
    <div className="w-full flex items-center gap-3 bg-register text-white text-xl justify-center py-3 cursor-pointer hover:brightness-90">
      <FaUserPlus />
      CADASTRAR FUNCIONÁRIO
    </div>
  )
}