import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Routes as RouteCollection } from 'react-router-dom';
import { delay } from '../common/utils';

import * as AuthService from '../services/AuthService';

import AuthContext from '../contexts/AuthContext';

import LoadingPage from '../pages/LoadingPage';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';

export function Routes() {

    const [isLoading, setIsLoading] = React.useState(true);
    const [isSignedIn, setIsSignedIn] = React.useState(false);
    const [userData, setUserData] = React.useState(null);

    function validateUser() {

        setIsLoading(true);
        delay(1.3)
            .then(() => {
                AuthService.verifyToken()
                    .then(isTokenValid => {
                        if (isTokenValid) {
                            AuthService.getAuthenticatedUserData()
                                .then(data => {
                                    if (data) {
                                        setUserData(data);
                                        setIsSignedIn(true);
                                    }
                                });

                        } else {
                            setIsSignedIn(false);
                        }

                        setIsLoading(false);
                    })
                    .catch(err => {
                        setIsLoading(false);
                    });
            });
    }

    React.useEffect(() => validateUser(), []);

    if (isLoading) {
        return (<LoadingPage></LoadingPage>);
    }

    return (
        <AuthContext.Provider value={{ validateUser, userData }}>
            <BrowserRouter>
                {isSignedIn ?
                    (<AuthenticatedRoutes></AuthenticatedRoutes>) :
                    (<UnauthenticatedRoutes></UnauthenticatedRoutes>)
                }
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

function AuthenticatedRoutes() {
    return (
        <RouteCollection>
            <Route path='/' element={<HomePage></HomePage>} />
        </RouteCollection>
    );
}

function UnauthenticatedRoutes() {
    return (
        <RouteCollection>
            <Route path='/' element={<LoginPage></LoginPage>} />
        </RouteCollection>
    );
}