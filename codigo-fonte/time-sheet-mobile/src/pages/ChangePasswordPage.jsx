import React from "react";
import { Text, View, Image, ActivityIndicator } from "react-native";
import AdjustableModal from "../components/AdjustableModal";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import CustomModal from "../components/CustomModal";
import { useInput } from "../hooks/useInput";
import { cpfValidations, passwordValidations } from "../common/validations";
import * as AuthService from "../services/AuthService";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AlertModalContent, InfoModalContent } from "../components/ModalContents";

const logo = require("../../assets/logo.png");

export default function ChangePasswordPage({ navigation }) {
  const [modalContent, setModalContent] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [waitingResponse, setWaitingResponse] = React.useState(false);

  const insets = useSafeAreaInsets();

  const cpfInput = useInput();
  cpfInput.setValidation(
    cpfValidations.cpfIsBlank,
    "O CPF não pode estar em branco."
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

  const repasswordInput = useInput();
  repasswordInput.setValidation(
    (value) => value !== passwordInput.value,
    "As senhas precisam ser iguais."
  );

  function changeUserPassword() {
    cpfInput.validate(cpfInput.value);
    passwordInput.validate(passwordInput.value);
    repasswordInput.validate(repasswordInput.value);

    var cpf = cpfInput.value;
    var password = passwordInput.value;
    var repassword = repasswordInput.value;

    if (!cpf || !password || !repassword) {
      return;
    }

    setWaitingResponse(true);

    AuthService.changepassword(cpf, password).then((result) => {
      switch (result.status) {
        case "PasswordChanged":
          setModalContent(
            <InfoModalContent
              title="Senha alterada com sucesso"
              message="A nova senha será necessária para o próximo acesso."
              goBack={navigation.goBack} />
          );
          break;
        case "MasterUserPassCannotBeChanged":
          setModalContent(
            <AlertModalContent
              title="Senha não pode ser alterada"
              message={result.message}
              goBack={navigation.goBack} />
          );
          break;
        case "UserNotFound":
          setModalContent(
            <AlertModalContent
              title="Funcionário não encontrado"
              message="Nenhum funcionário encontrado com esse CPF."
              goBack={() => setModalVisible(false)} />
          );
          break;
        default:
          setModalContent(
            <AlertModalContent
              title="Erro ao se comunicar com o servidor"
              message="Verifique sua conexão com a internet e tente novamente."
              goBack={navigation.goBack} />
          );
          break;
      }

      setWaitingResponse(false);
      setModalVisible(true);
    });
  }

  return (
    <View className="flex-1 justify-start items-center bg-primary-600">
      <CustomModal visible={modalVisible}>{modalContent}</CustomModal>

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
              Alteração de senha
            </Text>
            <Text className="text-sm font-semibold mb-5">
              Informe os dados para alterar a sua senha.
            </Text>
            <Input
              className="mb-1"
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
              className="mb-1"
              label="Nova senha"
              placeholder="digitar"
              secure="true"
              setInputValue={passwordInput.validate}
            />
            <ErrorMessage
              show={passwordInput.errorVisible}
              message={passwordInput.errorMessage}
            />

            <Input
              className="mb-1"
              label="Confirmar senha"
              placeholder="digitar"
              secure="true"
              setInputValue={repasswordInput.validate}
            />
            <ErrorMessage
              show={repasswordInput.errorVisible}
              message={repasswordInput.errorMessage}
            />

            <Button
              className="mt-5"
              title={waitingResponse ? "" : "Alterar senha"}
              color="primary-600"
              disabled={waitingResponse}
              isRunning={waitingResponse}
              onPress={changeUserPassword}
            />
            <Button
              className="mt-5"
              title="Voltar"
              color="primary-600"
              type="outline"
              disabled={waitingResponse}
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