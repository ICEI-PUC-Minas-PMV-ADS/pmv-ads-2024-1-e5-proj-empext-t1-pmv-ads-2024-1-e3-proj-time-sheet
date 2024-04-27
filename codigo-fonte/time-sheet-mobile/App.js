import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { delay } from "./src/common/utils";
import AuthContext from "./src/contexts/AuthContext";
import Routes from "./src/routes/app.routes";
import LoadingPage from "./src/pages/LoadingPage";
import * as AuthService from './src/services/AuthService';

export default function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [isAdministrator, setIsAdministrator] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

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
                    setIsLoading(false);
                    setIsAdministrator(data.role === "Administrator");
                  }
                });

            } else {
              setIsSignedIn(false);
              setIsLoading(false);
            }
          })
          .catch(err => {
            setIsLoading(false);
          });
      });
  }

  React.useEffect(() => validateUser(), []);

  if (isLoading) return <LoadingPage />;

  return (
    <SafeAreaProvider>
      <AuthContext.Provider value={{ isSignedIn, isAdministrator, validateUser, userData }}>
        <Routes />
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
