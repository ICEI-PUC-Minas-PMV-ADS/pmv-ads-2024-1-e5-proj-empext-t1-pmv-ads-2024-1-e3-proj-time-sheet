import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './custom.css';

import { Login } from './pages/Login.jsx';
import { ActiveUsers } from './pages/ActiveUsers.jsx'
import { DeactivatedUsers } from './pages/DeactivatedUsers.jsx';

import './styles/global.css'

export default function App() {
    return (
        <DeactivatedUsers />
    );
}