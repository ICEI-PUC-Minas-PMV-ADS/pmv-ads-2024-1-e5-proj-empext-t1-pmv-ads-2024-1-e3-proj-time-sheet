import { useState } from "react";

import { Header } from "../components/Header";
import { AdjustableModal } from "../components/AdjustableModal";
import { Input } from "../components/Input";
import { PrimaryButton } from "../components/PrimaryButton";
import { ErrorMenssage } from "../components/ErrorMenssage";

import { Link } from "react-router-dom";

export function NewEmployee() {
  const [ name, setName] = useState()
  const [ cpf, setCpf] = useState()
  const [ password, setPassword] = useState()
  const [ workingDay, setWorkingDay] = useState()
  const [ lunchTime, setlunchTime] = useState()

  

  function handleLogin() {
    console.log(name, cpf, password, workingDay, lunchTime)
    console.log(typeof workingDay)
  }

  return (
    <div className="w-full h-screen justify-between flex flex-col md:flex-row md:justify-normal">
      <Header />

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

            <Input 
              title="Nome" 
              type="text"
              value={name}
              onChange={e => setName(e.target.value)} 
            />
            <Input 
              title="CPF" 
              type="text" 
              mask="999.999.999-99"
              value={cpf}
              onChange={e => setCpf(e.target.value)} 
            />
            <Input 
              title="Senha" 
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)} 
            />
            <Input 
              title="Jornada de Trabalho" 
              type="text" 
              mask="9:99"
              value={workingDay}
              onChange={e => setWorkingDay(e.target.value.replace(":", "."))} 
            />
            <Input 
              title="Tempo de Almoço" 
              type="text" 
              mask="9:99"
              value={lunchTime}
              onChange={e => setlunchTime(e.target.value.replace(":", "."))}
            />
            {/* <ErrorMenssage errorMenssage="CPF ou senha inválidos"/> */}

            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-6 h-6"/>
              <span className="text-base text-black"> Funcionário Administrador ?</span>
            </div>
      
            <Link to="">
              <PrimaryButton title="Cadastrar Funcionário" bgColor="primary-800" onClick={handleLogin}/>
            </Link>
          </div>
        </AdjustableModal>
      </div>
    </div>
  );
}
