import React from "react";
import { Alert, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../components/Header";
import AuthContext from "../contexts/AuthContext";
import WorkJourneyPage from "../pages/WorkJourneyPage";
import LoginPage from "../pages/LoginPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import UsersPage from "../pages/UsersPage";
import CadastreUserPage from "../pages/CadastreUserPage";
import EditUserPage from "../pages/EditUserPage";
import EditUserPasswordPage from "../pages/EditUserPasswordPage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
  const { isSignedIn, isAdministrator } = React.useContext(AuthContext);

  return (
    <NavigationContainer>
      {isSignedIn & isAdministrator ? (
        <AdministratorRoutes />
      ) : isSignedIn & !isAdministrator ? (
        <EmployeeRoutes />
      ) : (
        <UnauthenticatedRoutes />
      )}
    </NavigationContainer>
  );
}

function UnauthenticatedRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordPage} />
    </Stack.Navigator>
  );
}

function EmployeeRoutes() {
  return (
    <Tab.Navigator initialRouteName="WorkJourney" screenOptions={screenOptions}>
      <Tab.Screen name="WorkJourney" component={WorkJourneyPage} />
    </Tab.Navigator>
  );
}

function AdministratorRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Users"
      screenOptions={({ route, navigation }) => {
        return screenOptions;
      }}
    >
      <Tab.Screen
        name="Users"
        component={UsersStack}
        options={{
          tabBarLabel: "Funcionários",
          tabBarIcon: ({ color, size }) => (
            <Icon name="card-account-details-outline" size={36} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="WorkJourney"
        component={WorkJourneyPage}
        options={{
          tabBarLabel: "Registro de Ponto",
          tabBarIcon: ({ color, size }) => (
            <Icon name="clock-outline" size={36} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TimeSheet"
        component={WorkJourneyPage}
        options={{
          tabBarLabel: "Relatórios",
          tabBarIcon: ({ color, size }) => (
            <Icon name="file-chart-outline" size={36} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function UsersStack({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => {
        if (
          route.name === "CadastreUserPage" ||
          route.name === "EditUserPage" ||
          route.name === "EditUserPasswordPage"
        ) {
          navigation.setOptions(screenOptionsHideTab);
          return screenOptionsHideTab;
        } else {
          navigation.setOptions(screenOptions);
          return screenOptions;
        }
      }}
    >
      <Stack.Screen name="UsersPage" component={UsersPage} />
      <Stack.Screen name="CadastreUserPage" component={CadastreUserPage} />
      <Stack.Screen name="EditUserPage" component={EditUserPage} />
      <Stack.Screen
        name="EditUserPasswordPage"
        component={EditUserPasswordPage}
      />
    </Stack.Navigator>
  );
}

const screenOptions = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    backgroundColor: "#102D30",
    borderColor: "#59A093",
    height: 80,
    paddingBottom: 10,
  },
  tabBarLabelStyle: {
    fontSize: 14,
  },
  tabBarActiveTintColor: "#9ABEA4",
  tabBarInactiveTintColor: "#345255",
};

const screenOptionsHideTab = {
  headerShown: false,
  tabBarHideOnKeyboard: true,
  tabBarStyle: {
    display: "none",
  },
  tabBarLabelStyle: {
    fontSize: 14,
  },
  tabBarActiveTintColor: "#9ABEA4",
  tabBarInactiveTintColor: "#345255",
};
