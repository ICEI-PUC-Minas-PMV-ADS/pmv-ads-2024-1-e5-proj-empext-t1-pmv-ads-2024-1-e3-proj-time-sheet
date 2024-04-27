import React from "react";
import { Text, View, Image } from "react-native";
import { Checkbox } from "react-native-paper";
import Header from "../components/Header";
import AdjustableModal from "../components/AdjustableModal";
import Input from "../components/Input";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";
import CustomModal from "../components/CustomModal";

const logo = require("../../assets/logo.png");

export default function CadastreUserPage({ navigation }) {
  const [checked, setChecked] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

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
            <Input className="mb-2" label="Nome" placeholder="digite o nome completo" setInputValue={() => { }} />
            <ErrorMessage show={false} message="CPF ou senha inválidos!" />
            <Input className="mb-2" label="CPF" placeholder="000.000.000-00" keyboardType="numeric" mask="999.999.999-99" setInputValue={() => { }} />
            <ErrorMessage show={false} message="CPF ou senha inválidos!" />
            <Input className="mb-2" label="Senha de acesso" placeholder="digitar" secure="true" setInputValue={() => { }} />
            <ErrorMessage show={false} message="CPF ou senha inválidos!" />
            <Input className="mb-2" label="Jornada de trabalho" placeholder="00:00" keyboardType="numeric" mask="99:99" setInputValue={() => { }} />
            <ErrorMessage show={false} message="CPF ou senha inválidos!" />
            <Input className="mb-2" label="Tempo de almoço" placeholder="00:00" keyboardType="numeric" mask="99:99" setInputValue={() => { }} />
            <ErrorMessage show={false} message="CPF ou senha inválidos!" />
            <View className="flex flex-row items-center mb-2">
              <Checkbox color="#1E3F42" status={checked ? "checked" : "unchecked"} onPress={() => { setChecked(!checked); }} />
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
