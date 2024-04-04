export function Header() {
  return (
    <div className="w-full flex justify-between items-center px-3 py-3 bg-primary-800">
      <div>
        <h2 className="text-sm text-white leading-none">Carlos Almeida</h2>
        <span className="text-xs text-primary-100 leading-none">Administrador</span>
      </div>

      <div>
        <a href="#" className="text-xs text-white">Sair</a>
      </div>
    </div>
  )
}