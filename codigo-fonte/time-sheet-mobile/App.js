import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox } from "react-native";
import { delay } from "./src/common/utils";
import Routes from "./src/routes/app.routes";
import AuthContext from "./src/contexts/AuthContext";
import LoadingPage from "./src/pages/LoadingPage";
import * as AuthService from "./src/services/AuthService";
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  "Cannot update a component (`BottomTabNavigator`)",
  "componentWillMount has been renamed, and is not recommended for use",
]);

export default function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [isAdministrator, setIsAdministrator] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  function validateUser() {
    setIsLoading(true);
    delay(1.3).then(() => {
      AuthService.verifyToken()
        .then((isTokenValid) => {
          if (isTokenValid) {
            AuthService.getAuthenticatedUserData().then((data) => {
              if (data) {
                setUserData(data);
                setIsSignedIn(true);
                setIsLoading(false);
                setIsAdministrator(data.role === "Administrator");
              } else {
                setIsSignedIn(false);
                setIsLoading(false);
              }
            });
          } else {
            setIsSignedIn(false);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
        });
    });
  }

  React.useEffect(() => validateUser(), []);

  if (isLoading) return <LoadingPage />;

  return (
    <SafeAreaProvider>
      <AuthContext.Provider
        value={{ isSignedIn, isAdministrator, validateUser, userData }}
      >
        <Routes />
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}
