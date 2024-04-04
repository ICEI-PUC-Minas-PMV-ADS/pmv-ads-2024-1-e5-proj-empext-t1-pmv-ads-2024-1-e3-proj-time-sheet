import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './custom.css';

import { Login } from './pages/Login.jsx';
import { Home } from './pages/Home.jsx';

import './styles/global.css'

export default function App() {
    return (
        <Home />
    );
}