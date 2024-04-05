import { FaPen, FaUser } from "react-icons/fa";


export function Employee({ name, activated }) {
  return (
    <div className="w-full bg-primary-400 px-6 py-3 flex justify-between items-center mb-2">
      <p className="text-sm text-white cursor-pointer">{name}</p>
      <div>
        { activated ? (
          <div className="flex items-center text-white gap-3 cursor-pointer">
            <FaPen /> Editar
          </div>
        ) : (
          <div className="flex items-center text-white gap-3 cursor-pointer">
            <FaUser /> Habilitar
          </div>
        )
        }
      </div>
    </div>
  )
}