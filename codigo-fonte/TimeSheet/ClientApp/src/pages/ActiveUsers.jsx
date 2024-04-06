import { Employee } from "../components/Employee";
import { EmployeeRegistrationButton } from "../components/EmployeeRegistrationButton";
import { Header } from "../components/Header";

import { Link } from "react-router-dom";

export function ActiveUsers() {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <nav className="w-full flex items-center gap-3 px-3 my-3">
        <div className="flex items-center gap-2 bg-primary-100 px-2 py-1 rounded-md hover:brightness-90 cursor-pointer">
          <span class="material-symbols-outlined text-white">
            account_circle
          </span>
          <span className="text-white text-xs">
            Usuários ativos
          </span>
        </div>

        <Link to="/users-disabled" className="flex items-center gap-2">
          <span class="material-symbols-outlined text-white">no_accounts</span>
          <span className="text-white text-xs">
            Usuários inátivos
          </span>
        </Link>
      </nav>

      <Employee name="Matheus Silva" activated/>
      <Employee name="Gustavo Oliveira" activated/>
      <Employee name="Thiago Martins" activated/>

      <Link to="/new-employee" className="absolute bottom-0 w-full">
        <EmployeeRegistrationButton />
      </Link>
    </div>
  );
}
