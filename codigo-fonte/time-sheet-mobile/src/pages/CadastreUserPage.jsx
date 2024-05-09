import React from "react";
import { Text, View, Image, ActivityIndicator } from "react-native";
import { Checkbox } from "react-native-paper";
import { convertToTime } from "../common/utils";
import Header from "../components/Header";
import AdjustableModal from "../components/AdjustableModal";
import Input from "../components/Input";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";
import CustomModal from "../components/CustomModal";
import { useInput } from "../hooks/useInput";
import { useRoute } from "@react-navigation/native";
import {
  nameValidations,
  cpfValidations,
  passwordValidations,
  timeValidations,
} from "../common/validations";
import * as UserService from "../services/UserService";
import MessageModal from "../components/MessageModal";

const logo = require("../../assets/logo.png");

export default function CadastreUserPage({ navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);
  const [waitingResponse, setWaitingResponse] = React.useState(false);
  const [role, setRole] = React.useState(false);

  const route = useRoute();
  const { updateUsers } = route.params;

  function goBack() {
    updateUsers();
    navigation.goBack();
  }

  /* Name Input */

  const nameInput = useInput();
  nameInput.setValidation(
    nameValidations.nameIsBlank,
    "O Nome não pode estar em branco."
  );
  nameInput.setValidation(
    nameValidations.nameLengthTooShort,
    "O Nome precisa ter no mínimo 3 caracteres."
  );
  nameInput.setValidation(
    nameValidations.nameLengthTooLong,
    "O Nome pode ter no máximo 50 caracteres."
  );

  /* CPF input */

  const cpfInput = useInput();
  cpfInput.setValidation(
    cpfValidations.cpfIsBlank,
    "O CPF não pode estar em branco."
  );
  cpfInput.setValidation(
    cpfValidations.cpfLengthTooShort,
    "O CPF precisa ter 11 dígitos."
  );
  cpfInput.setValidation(
    cpfValidations.cpfIsAllDigitsSame,
    "O CPF não pode ter todos os dígitos iguais."
  );
  cpfInput.setValidation(
    cpfValidations.cpfIsInvalid,
    "O CPF informado não é válido."
  );

  /* Password Input */

  const passwordInput = useInput();
  passwordInput.setValidation(
    passwordValidations.passwordIsBlank,
    "A senha não pode estar em branco."
  );
  passwordInput.setValidation(
    passwordValidations.passwordLengthTooShort,
    "A senha precisa ter no mínimo 8 caracteres."
  );
  passwordInput.setValidation(
    passwordValidations.passwordDoesNotHaveLetters,
    "A senha precisa ter no mínimo 1 letra."
  );
  passwordInput.setValidation(
    passwordValidations.passwordDoesNotHaveUpperLetters,
    "A senha precisa ter no mínimo 1 letra maiúscula."
  );
  passwordInput.setValidation(
    passwordValidations.passwordDoesNotHaveNumbers,
    "A senha precisa ter no mínimo 1 número."
  );
  passwordInput.setValidation(
    passwordValidations.passwordContainsSpecialChars,
    "A senha não pode ter caracteres especiais."
  );

  /* TotalTime Input */

  const totalTimeInput = useInput();
  totalTimeInput.setValidation(
    timeValidations.timeIsBlank,
    "O tempo total de trabalho não pode estar em branco."
  );
  totalTimeInput.setValidation(
    timeValidations.timeIsOutsideTimeBounds,
    "O tempo total de trabalho precisa estar dentro do limite de 0h às 24h."
  );

  /* LunchTime Input */

  const lunchTimeInput = useInput();
  lunchTimeInput.setValidation(
    timeValidations.timeIsBlank,
    "O tempo de almoço não pode estar em branco."
  );
  lunchTimeInput.setValidation(
    timeValidations.timeIsOutsideTimeBounds,
    "O tempo de almoço precisa estar dentro do limite de 0h às 24h."
  );
  lunchTimeInput.setValidation(
    (lunchTime) => lunchTime > totalTimeInput.value ?? 0,
    "O tempo de almoço não pode ser maior que o tempo de trabalho."
  );

  function cadastreUser() {
    cpfInput.validate(cpfInput.value);
    nameInput.validate(nameInput.value);
    passwordInput.validate(passwordInput.value);
    totalTimeInput.validate(totalTimeInput.value);
    lunchTimeInput.validate(lunchTimeInput.value);

    var cpf = cpfInput.value;
    var name = nameInput.value;
    var password = passwordInput.value;
    var totalTime = totalTimeInput.value;
    var lunchTime = lunchTimeInput.value;

    if (!cpf || !name || !password || !totalTime || !lunchTime) {
      return;
    }

    setWaitingResponse(true);

    UserService.createUser(
      cpf,
      name,
      password,
      role,
      totalTime,
      lunchTime
    ).then((result) => {
      switch (result.status) {
        case "UserCreated":
          setModalContent(<UserCreatedModalContent goBack={goBack} />);
          break;
        case "UserAlreadyExists":
          setModalContent(
            <UserAlreadyExistsModalContent
              goBack={() => setModalVisible(false)}
            />
          );
          break;
        default:
          setModalContent(<ServerErrorModalContent goBack={goBack} />);
          break;
      }

      setModalVisible(true);
      setWaitingResponse(false);
    });
  }

  return (
    <View className="flex-1 w-full bg-primary-600">
      <CustomModal visible={modalVisible}>{modalContent}</CustomModal>

      <Header />
      <View className="flex w-full justify-center items-center mt-20 py-10">
        <Image
          className="object-contain object-center h-36 w-36"
          source={logo}
        />
      </View>
      <View className="flex-1 w-full flex-col justify-end items-center mt-20">
        <AdjustableModal keyboardVerticalOffset={-200}>
          <View className="flex w-full">
            <Text className="text-3xl font-bold text-primary-800 mb-1">
              Cadastrar funcionário
            </Text>
            <Text className="text-sm font-semibold mb-5">
              Parabéns, sua empresa está crescendo!
            </Text>

            <Input
              className="mb-2"
              label="Nome"
              placeholder="digite o nome completo"
              setInputValue={nameInput.validate}
            />
            <ErrorMessage
              show={nameInput.errorVisible}
              message={nameInput.errorMessage}
            />

            <Input
              className="mb-2"
              label="CPF"
              placeholder="000.000.000-00"
              keyboardType="numeric"
              mask="999.999.999-99"
              setInputValue={cpfInput.validate}
            />
            <ErrorMessage
              show={cpfInput.errorVisible}
              message={cpfInput.errorMessage}
            />

            <Input
              className="mb-2"
              label="Senha de acesso"
              placeholder="digitar"
              secure="true"
              setInputValue={passwordInput.validate}
            />
            <ErrorMessage
              show={passwordInput.errorVisible}
              message={passwordInput.errorMessage}
            />

            <Input
              className="mb-2"
              label="Jornada de trabalho"
              placeholder="00:00"
              keyboardType="numeric"
              mask="99:99"
              setInputValue={(value) =>
                totalTimeInput.validate(convertToTime(value))
              }
            />
            <ErrorMessage
              show={totalTimeInput.errorVisible}
              message={totalTimeInput.errorMessage}
            />

            <Input
              className="mb-2"
              label="Tempo de almoço"
              placeholder="00:00"
              keyboardType="numeric"
              mask="99:99"
              setInputValue={(value) =>
                lunchTimeInput.validate(convertToTime(value))
              }
            />
            <ErrorMessage
              show={lunchTimeInput.errorVisible}
              message={lunchTimeInput.errorMessage}
            />

            <View className="flex flex-row items-center mb-2">
              <Checkbox
                color="#1E3F42"
                status={role ? "checked" : "unchecked"}
                onPress={() => {
                  setRole(!role);
                }}
              />
              <Text className="text-sm font-bold">
                Funcionário Administrador?
              </Text>
            </View>
            <Button
              title="Cadastrar funcionário"
              color="primary-600"
              onPress={cadastreUser}
              disabled={waitingResponse}
              isRunning={waitingResponse}
            />
            <Button
              disabled={waitingResponse}
              className="mt-5"
              title="Voltar"
              color="primary-600"
              type="outline"
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        </AdjustableModal>
      </View>
    </View>
  );
}

function UserAlreadyExistsModalContent({ goBack }) {
  return (
    <View className="flex flex-col">
      <Text className="text-2xl font-bold text-danger-600 mb-1">
        Funcionário já cadastrado
      </Text>
      <Text className="text-sm font-semibold mb-5">
        Já existe um funcionário com esse CPF cadastrado no sistema.
      </Text>
      <Button
        className="mt-5"
        title="Alterar dados"
        color="primary-600"
        type="outline"
        onPress={goBack}
      />
    </View>
  );
}

function UserCreatedModalContent({ goBack }) {
  return (
    <View className="flex flex-col">
      <Text className="text-2xl font-bold text-primary-800 mb-1">
        Funcionário cadastrado
      </Text>
      <Text className="text-sm font-semibold mb-5">
        Funcionário cadastrado com sucesso, e já pode acessar o app usando a
        senha de acesso.
      </Text>
      <Button
        className="mt-5"
        title="Ok"
        color="primary-600"
        type="outline"
        onPress={goBack}
      />
    </View>
  );
}

function ServerErrorModalContent({ goBack }) {
  return (
    <View className="flex flex-col">
      <Text className="text-xl font-bold text-danger-600 mb-1">
        Erro ao se comunicar com o servidor
      </Text>
      <Text className="text-sm font-semibold mb-5">
        Verifique sua conexão com a internet e tente novamente.
      </Text>
      <Button
        className="mt-5"
        title="Ok"
        color="primary-600"
        type="outline"
        onPress={goBack}
      />
    </View>
  );
}
