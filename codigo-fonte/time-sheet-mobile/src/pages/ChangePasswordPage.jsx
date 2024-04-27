import React from "react";
import { Text, View, Image } from "react-native";
import AdjustableModal from "../components/AdjustableModal";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import CustomModal from "../components/CustomModal";

const logo = require("../../assets/logo.png");

export default function ChangePasswordPage({ navigation }) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <View className="flex-1 justify-start items-center bg-primary-600">

      <CustomModal visible={showModal}>
        <View className="flex flex-col">
          <Text className="text-3xl font-bold text-primary-800 mb-1">Senha alterada</Text>
          <Text className="text-sm font-semibold mb-5">A nova senha será necessária para o próximo acesso.</Text>
          <Button className="mt-5" title="Ok" color="primary-600" type="outline"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </CustomModal>

      <View className="flex w-full justify-center items-center bg-primary-800 pt-8 pb-3">
        <Text className="text-white text-base">Gestão de tempo de uma maneira simples</Text>
      </View>
      <View className="flex w-full justify-center items-center mt-20 py-10">
        <Image className="object-contain object-center h-36 w-36" source={logo} />
      </View>
      <View className="flex-1 w-full flex-col justify-end items-center mt-20">
        <AdjustableModal>
          <View className="flex h-full w-full">
            <Text className="text-3xl font-bold text-primary-800 mb-1">Alteração de senha</Text>
            <Text className="text-sm font-semibold mb-5">Informe os dados para alterar a sua senha.</Text>
            <Input className="mb-1" label="CPF" placeholder="000.000.000-00" keyboardType="numeric" mask="999.999.999-99" setInputValue={() => { }} />
            <ErrorMessage show={false} message="CPF ou senha inválidos!" />

            <Input className="mb-1" label="Nova senha" placeholder="digitar" secure="true" setInputValue={() => { }} />
            <ErrorMessage show={false} message="CPF ou senha inválidos!" />

            <Input className="mb-1" label="Confirmar senha" placeholder="digitar" secure="true" setInputValue={() => { }} />
            <ErrorMessage show={false} message="CPF ou senha inválidos!" />

            <Button className="mt-5" title="Alterar senha" color="primary-600" onPress={() => setShowModal(true)} />
            <Button className="mt-5" title="Voltar" color="primary-600" type="outline" onPress={() => { navigation.goBack(); }} />
          </View>
        </AdjustableModal>
      </View>
    </View>
  );
}
