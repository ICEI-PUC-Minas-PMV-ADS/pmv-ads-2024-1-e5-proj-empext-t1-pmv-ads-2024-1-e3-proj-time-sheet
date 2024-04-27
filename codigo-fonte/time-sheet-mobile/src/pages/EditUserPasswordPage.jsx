import React from "react";
import { Text, View, Image } from "react-native";
import Header from "../components/Header";
import AdjustableModal from "../components/AdjustableModal";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import CustomModal from "../components/CustomModal";

const logo = require("../../assets/logo.png");

export default function EditUserPasswordPage({ navigation }) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <View className="flex-1 w-full bg-primary-600">
      <Header />

      <CustomModal visible={showModal}>
        <View className="flex flex-col">
          <Text className="text-3xl font-bold text-primary-800 mb-1">Senha alterada</Text>
          <Text className="text-sm font-semibold mb-5">A nova senha será necessária para o próximo acesso.</Text>
          <Button className="mt-5" title="Ok" color="primary-600" type="outline"
            onPress={() => {
              navigation.pop(2);
            }}
          />
        </View>
      </CustomModal>

      <View className="flex w-full justify-center items-center mt-20 py-10">
        <Image className="object-contain object-center h-36 w-36" source={logo}/>
      </View>
      <View className="flex-1 w-full flex-col justify-end items-center mt-20 border">
        <AdjustableModal keyboardVerticalOffset={-200}>
          <View className="flex h-full w-full">
            <View className="flex flex-row">
              <View>
                <Text className="text-3xl font-bold text-primary-800 mb-1">Carlos Almeida</Text>
                <Text className="text-sm font-semibold mb-5">Alterar senha de acesso</Text>
              </View>
            </View>
            <Input className="mb-2" label="Senha" placeholder="digitar" secure="true" setInputValue={() => {}}/>
            <ErrorMessage show={false} message="Senha" />
            <Input className="mb-2" label="Confirmar senha" placeholder="digitar" secure="true" setInputValue={() => {}}/>
            <ErrorMessage show={false} message="CPF ou senha inválidos!" />

            <Button className="mt-5" title="Alterar senha" color="primary-600"
              onPress={() => setShowModal(true)}
            />
            <Button className="mt-5" title="Voltar" color="primary-600" type="outline"
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
