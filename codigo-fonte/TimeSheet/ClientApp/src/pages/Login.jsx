import { Announcment } from "../components/Announcment";
import { AdjustableModal } from "../components/AdjustableModal";
import { Input } from "../components/Input";
import { PrimaryButton } from "../components/PrimaryButton";

import logoImg from "../assets/logo.svg";


export function Login() {
  return (
    <div className="w-full h-screen justify-between flex flex-col md:flex-row md:justify-normal">
      <Announcment />

      <div className="self-center md:w-2/4 xl:w-3/5">
        <img 
          className="w-40 mx-auto" 
          src={logoImg} 
          alt="logo time sheet" />
      </div>

      <div className="md:w-2/4 md:mr-auto xl:w-2/5">

        <AdjustableModal>
          <div className="p-10 md:mt-44 2xl:w-3/5 2xl:self-center">
            <div>
              <h1 className="text-3xl font-bold text-time-sheet mb-2 select-none">
                Bem vindo!
              </h1>
              <p className="text-sm font-semibold text-time-sheet mb-5 select-none">
                Trabalho com mais controle e segurança.
              </p>
            </div>

            <Input title="CPF" type="number" />
            <Input title="Senha" type="password" />

            <a href="#" className="text-base text-slate-600">
              Esqueceu a senha?
              <span className="text-base text-primary-200"> Alterar</span>
            </a>

            <PrimaryButton title="Entrar" bgColor="primary-800"/>
          </div>
        </AdjustableModal>
      </div>
    </div>
  );
}

