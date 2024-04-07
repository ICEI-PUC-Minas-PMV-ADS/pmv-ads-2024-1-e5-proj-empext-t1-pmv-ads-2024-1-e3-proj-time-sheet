import React from 'react';
import { FaRegUser } from "react-icons/fa";
import AuthContext from '../contexts/AuthContext';

import * as AuthService from '../services/AuthService';

export function Header() {

    const { userData, validateUser } = React.useContext(AuthContext);

    function handleLogout() {
        AuthService.logout()
            .then(response => {
                validateUser();
            });
    }

    return (
        <div className="w-full flex justify-between items-center px-3 py-3 bg-primary-800">
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center text-white bg-primary-400 w-10 h-10 rounded-full ">
                    <FaRegUser />
                </div>
                <div>
                    <h2 className="text-sm text-white leading-none">{userData.name}</h2>
                    <span className="text-xs text-primary-100 leading-none">{userData.role}</span>
                </div>
            </div>

            <button className="flex items-center justify-between text-white w-10 h-10" onClick={handleLogout}>
                Sair
            </button>
        </div>
    )
}