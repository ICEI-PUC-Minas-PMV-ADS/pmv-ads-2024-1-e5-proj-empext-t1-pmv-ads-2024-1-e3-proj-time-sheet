import { useState, useContext } from "react";

import { Announcment } from "../components/Announcment";
import { AdjustableModal } from "../components/AdjustableModal";
import { Input } from "../components/Input";
import { PrimaryButton } from "../components/PrimaryButton";
import { ErrorMenssage } from "../components/ErrorMenssage";

import { Link, useNavigate } from "react-router-dom";

import * as AuthService from '../services/AuthService';
import AuthContext from '../contexts/AuthContext';

import logoImg from "../assets/logo.svg";

export default function LoginPage() {

    const [cpf, setCpf] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const [waitingResponse, setWaitingResponse] = useState(false);

    const { validateUser } = useContext(AuthContext);

    function handleLogin() {

        setWaitingResponse(true);

        AuthService.authenticate(cpf, password)
            .then(({ message, status }) => {
                if (status === "UserAuthenticated") {
                    validateUser();
                } else {
                    setError(message);
                }

                setWaitingResponse(false);
            })
    }

    return (
        <div className="w-full h-screen justify-between flex flex-col md:flex-row md:justify-normal">
            <Announcment />

            <div className="self-center md:w-2/4 xl:w-3/5">
                <img className="w-40 mx-auto" src={logoImg} alt="logo time sheet" />
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

                        <Input
                            title="CPF" type="text"
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
                        {error && <ErrorMenssage errorMenssage={error} />}

                        <a href="#" className="text-base text-slate-600">
                            Esqueceu a senha?
                            <span className="text-base text-primary-200"> Alterar</span>
                        </a>

                        <div>
                            <PrimaryButton disabled={waitingResponse} title="Entrar" bgColor="primary-800" onClick={handleLogin} />
                        </div>
                    </div>
                </AdjustableModal>
            </div>
        </div>
    );
}
