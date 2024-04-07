import React from 'react';
import { Header } from '../components/Header';

import AuthContext from '../contexts/AuthContext';
import * as AuthService from '../services/AuthService';

export default function HomePage() {

    const { validateUser } = React.useContext(AuthContext);

    function handleLogout() {
        AuthService.logout()
            .then(response => {
                validateUser();
            });
    }

    return (
        <div className="w-full h-screen justify-start flex flex-col items-center">
            <Header></Header>
            <div className="h-full w-full flex justify-center items-center">
                <div className="text-center">
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary-100 sm:text-5xl">Tela em andamento</h1>
                    <p className="mt-6 text-base leading-7 text-primary-200">Desculpe, essa tela ainda está em desenvolvimento.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a onClick={handleLogout} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Voltar para login</a>
                    </div>
                </div>
            </div>
        </div>
    );
}