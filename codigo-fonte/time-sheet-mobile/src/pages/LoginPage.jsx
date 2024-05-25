import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AdjustableModal from "../components/AdjustableModal";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import * as AuthService from "../services/AuthService";
import AuthContext from "../contexts/AuthContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Local from "expo-location";

const logo = require("../../assets/logo.png");

export default function LoginPage({ navigation }) {
  const [cpf, setCpf] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState();
  const [errorVisible, setErrorVisible] = React.useState(false);
  const [waitingResponse, setWaitingResponse] = React.useState(false);
  const insets = useSafeAreaInsets();
  
  const { validateUser } = React.useContext(AuthContext);

  function handleCpfInput(input) {
    setErrorVisible(false);
    setCpf(input);
  }

  (async () => {
      
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
  });

  function handlePasswordInput(input) {
    setErrorVisible(false);
    setPassword(input);
  }

  function handleLogin() {
    if (!cpf || !password) {
      setError("É necessário informar CPF e Senha.");
      setErrorVisible(true);
      return;
    }

    setWaitingResponse(true);

    AuthService.authenticate(cpf, password).then(({ message, status }) => {
      if (status === "UserAuthenticated") {
        validateUser();
      } else {
        setError(message);
        setErrorVisible(true);
      }

      setWaitingResponse(false);
    });
  }

  return (
    <View className="flex-1 justify-start items-center bg-primary-600">
      <View
        className="flex w-full justify-center items-center bg-primary-800 pb-3"
        style={{
          paddingTop: insets.top + 12,
        }}
      >
        <Text className="text-white text-base">
          Gestão de tempo de uma maneira simples
        </Text>
      </View>
      <View className="flex w-full justify-center items-center mt-20 py-10">
        <Image
          className="object-contain object-center h-36 w-36"
          source={logo}
        />
      </View>
      <View className="flex-1 w-full flex-col justify-end items-center mt-20">
        <AdjustableModal>
          <View className="flex h-full w-full">
            <Text className="text-3xl font-bold text-primary-800 mb-1">
              Bem vindo!
            </Text>
            <Text className="text-sm font-semibold mb-5">
              Trabalhe com mais controle e segurança.
            </Text>
            <Input
              className="mb-5"
              label="CPF"
              placeholder="000.000.000-00"
              keyboardType="numeric"
              mask="999.999.999-99"
              setInputValue={handleCpfInput}
            />
            <Input
              className="mb-2"
              label="Senha de acesso"
              placeholder="digitar"
              secure="true"
              setInputValue={handlePasswordInput}
            />
            <ErrorMessage show={errorVisible} message={error} />
            <TouchableOpacity
              className="flex flex-row self-end mb-5"
              onPress={() => {
                navigation.navigate("ChangePassword");
              }}
            >
              <Text className="text-sm text-slate-600 mr-1">
                Esqueceu a senha?
              </Text>
              <Text className="text-sm text-primary-200">Alterar</Text>
            </TouchableOpacity>
            <Button
              title={waitingResponse ? "" : "Entrar"}
              color="primary-600"
              onPress={handleLogin}
              disabled={waitingResponse}
              isRunning={waitingResponse}
            />
          </View>
        </AdjustableModal>
      </View>
    </View>
  );
}
