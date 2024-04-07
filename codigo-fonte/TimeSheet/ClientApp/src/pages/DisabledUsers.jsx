import { Employee } from "../components/Employee";
import { EmployeeRegistrationButton } from "../components/EmployeeRegistrationButton";
import { Header } from "../components/Header";

import { Link } from "react-router-dom";

export function DisabledUsers() {
  return (
    <div className="h-screen flex flex-col">
      <Header />

      <nav className="w-full flex items-center gap-3 px-3 my-3">
        <Link to="/home" className="flex items-center gap-2 ">
          <span class="material-symbols-outlined text-white">
            account_circle
          </span>
          <span className="text-white text-xs">
            Usuários ativos
          </span>
        </Link>

        <div className="flex items-center gap-2 bg-primary-100 px-2 py-1 rounded-md hover:brightness-90 cursor-pointer">
          <span class="material-symbols-outlined text-white">no_accounts</span>
          <span className="text-white text-xs">
            Usuários inátivos
          </span>
        </div>
      </nav>

      <Employee name="Lucas Emanuel" activated={false}/>
      <Employee name="Fabiana Santos" activated={false}/>
      <Employee name="Ana Maria" activated={false}/>

      <Link to="/new-employee" className="absolute bottom-0 w-full">
        <EmployeeRegistrationButton />
      </Link>
    </div>
  );
}
