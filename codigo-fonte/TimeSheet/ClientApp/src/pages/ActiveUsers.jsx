import { Employee } from "../components/Employee";
import { EmployeeRegistrationButton } from "../components/EmployeeRegistrationButton";
import { Header } from "../components/Header";

export function ActiveUsers() {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <nav className="w-full flex items-center gap-3 px-3 my-3">
        <div className="flex items-center gap-2 bg-primary-100 px-2 py-1 rounded-md hover:brightness-90 cursor-pointer">
          <span class="material-symbols-outlined text-white">
            account_circle
          </span>
          <a href="active-employees" className="text-white text-xs">
            Usuários ativos
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span class="material-symbols-outlined text-white">no_accounts</span>
          <a href="inactive-employees" className="text-white text-xs">
            Usuários inátivos
          </a>
        </div>
      </nav>

      <Employee name="Matheus Silva" activated/>
      <Employee name="Gustavo Oliveira" activated/>
      <Employee name="Thiago Martins" activated/>

      <div className="absolute bottom-0 w-full">
        <EmployeeRegistrationButton />
      </div>
    </div>
  );
}
