import React from "react";
import { Text, View, Image } from "react-native";
import { Checkbox } from "react-native-paper";
import Header from "../components/Header";
import AdjustableModal from "../components/AdjustableModal";
import Input from "../components/Input";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";
import CustomModal from "../components/CustomModal";
import { ValidateCpf } from "../common/utils";
import * as UserService from "../services/UserService";

const logo = require("../../assets/logo.png");

export default function CadastreUserPage({ navigation }) {
  const [checked, setChecked] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);
  const [cpf, setCpf] = React.useState(null);
  const [cpfError, setCpfError] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [nameError, setNameError] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [passwordError, setPasswordError] = React.useState(null);
  const [role, setRole] = React.useState(false);
  const [lunchTime, setLunchTime] = React.useState(null);
  const [lunchTimeError, setLunchTimeError] = React.useState(null);
  const [totalTime, setTotalTime] = React.useState(null);
  const [totalTimeError, setTotalTimeError] = React.useState(null);


  function ValidateInputCpf(cpf) {
    if (!ValidateCpf(cpf)) {
      setCpfError("Informe um CPF Válido")
      setCpf(null)
    }
    else {
      setCpfError(null)
      setCpf(cpf)
    }
  }

  function ValidateInputName(name) {
    if (!name) {
      setNameError("Informe um nome Válido")
      setName(null)
    }
    else {
      setNameError(null)
      setName(name)
    }
  }


  function ValidateInputPassword(password) {
    if (!password) {
      setPasswordError("A senha não pode ser vazia.")
      setPassword(null)
    }
    else {
      setPasswordError(null)
      setPassword(password)
    }
  }
  function ValidateTotalTime(totalTime) {
    if (totalTime === null || totalTime === "") {
      setTotalTimeError("É necessário informar um tempo de jornada válido.")
      setTotalTime(null)

    }

    else {
      setTotalTimeError(null)
      setTotalTime(totalTime)
    }

  }



  function ValidateLunchTime(lunchTime) {
    if (lunchTime === null || lunchTime === "") {
      setLunchTimeError("É necessário informar um tempo de almoço válido.")
      setLunchTime(null)

    }
    else if (lunchTime >= totalTime) {
      console.log(totalTime)
      console.log(lunchTime)
      setLunchTimeError("O tempo de almoço não pode ser maior ou igual que o tempo de jornada.")
      setLunchTime(null)
    }
    else {
      setLunchTimeError(null)
      setLunchTime(lunchTime)
    }

  }

  function CadastreUser() {
    if (!cpf || !name || !password || !lunchTime || !totalTime) {
      return
    }
    UserService.createUser(cpf, name, password, role, lunchTime, totalTime)
      .then(result => {
        if (result.status === "UserCreated") {
          showModal(true)

        }
      })
  }



  return (
    <View className="flex-1 w-full bg-primary-600">

      <CustomModal visible={showModal}>
        <View className="flex flex-col">
          <Text className="text-3xl font-bold text-primary-800 mb-1">Funcionário cadastrado</Text>
          <Text className="text-sm font-semibold mb-5">O usuário Carlos foi cadastrado com sucesso, e já pode acessar o app.</Text>
          <Button className="mt-5" title="Ok" color="primary-600" type="outline"
            onPress={() => {
              navigation.pop(2);
            }}
          />
        </View>
      </CustomModal>

      <Header />
      <View className="flex w-full justify-center items-center mt-20 py-10">
        <Image className="object-contain object-center h-36 w-36" source={logo} />
      </View>
      <View className="flex-1 w-full flex-col justify-end items-center mt-20">
        <AdjustableModal keyboardVerticalOffset={-200}>
          <View className="flex w-full">
            <Text className="text-3xl font-bold text-primary-800 mb-1">Cadastrar funcionário</Text>
            <Text className="text-sm font-semibold mb-5">Parabéns, sua empresa está crescendo!</Text>

            <Input className="mb-2" label="Nome" placeholder="digite o nome completo" setInputValue={ValidateInputName} />
            <ErrorMessage show={nameError !== null} message={nameError} />

            <Input className="mb-2" label="CPF" placeholder="000.000.000-00" keyboardType="numeric" mask="999.999.999-99" setInputValue={ValidateInputCpf} />
            <ErrorMessage show={cpfError !== null} message={cpfError} />

            <Input className="mb-2" label="Senha de acesso" placeholder="digitar" secure="true" setInputValue={ValidateInputPassword} />
            <ErrorMessage show={passwordError !== null} message={passwordError} />

            <Input className="mb-2" label="Jornada de trabalho" placeholder="00:00" keyboardType="numeric" mask="99:99" setInputValue={ValidateTotalTime} />
            <ErrorMessage show={totalTimeError !== null} message={totalTimeError} />

            <Input className="mb-2" label="Tempo de almoço" placeholder="00:00" keyboardType="numeric" mask="99:99" setInputValue={ValidateLunchTime} />
            <ErrorMessage show={lunchTimeError !== null} message={lunchTimeError} />

            <View className="flex flex-row items-center mb-2">
              <Checkbox color="#1E3F42" status={role ? "checked" : "unchecked"} onPress={() => { setRole(!role); }} />
              <Text className="text-sm font-bold">Funcionário Administrador?</Text>
            </View>
            <Button title="Cadastrar funcionário" color="primary-600" onPress={() => setShowModal(true)} />
            <Button className="mt-5" title="Voltar" color="primary-600" type="outline" onPress={() => { navigation.goBack(); }}
            />
          </View>
        </AdjustableModal>
      </View>
    </View>
  );
}
