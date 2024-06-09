import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LogBox } from "react-native";
import { delay } from "./src/common/utils";
import Routes from "./src/routes/app.routes";
import AuthContext from "./src/contexts/AuthContext";
import LoadingPage from "./src/pages/LoadingPage";
import * as AuthService from "./src/services/AuthService";
import { NativeWindStyleSheet } from "nativewind";
import RefreshContext from "./src/contexts/RefreshContext";

import { registerRootComponent } from "expo";

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
  const [refresh, setRefresh] = React.useState(false);

  function validateUser() {
    setIsLoading(true);
    delay(1.3).then(() => {
      AuthService.getAuthenticatedUserData().then((result) => {
        if (result.status === "UserFound") {
          setUserData(result.userData);
          setIsSignedIn(true);
          setIsLoading(false);
          setIsAdministrator(result.userData.role === "Administrator");
        } else {
          setIsSignedIn(false);
          setIsLoading(false);
        }
      }).catch((err) => {
        setIsSignedIn(false);
        setIsLoading(false);
      });
    });
  }

  React.useEffect(() => validateUser(), []);
  
  function updateRefresh() {
    setRefresh(!refresh);
  }

  if (isLoading) return <LoadingPage />;

  return (
    <SafeAreaProvider>
      <AuthContext.Provider
        value={{ isSignedIn, isAdministrator, validateUser, userData }}
      >
        <RefreshContext.Provider value={{ refresh, updateRefresh }}>
          <Routes />
        </RefreshContext.Provider>
      </AuthContext.Provider>
    </SafeAreaProvider>
  );
}

registerRootComponent(App)