import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Checkbox } from "react-native-paper";
import Header from "../components/Header";
import AdjustableModal from "../components/AdjustableModal";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomModal from "../components/CustomModal";
import Divider from "../components/Divider";

const logo = require("../../assets/logo.png");

export default function EditUserPage({ navigation }) {
  const [checked, setChecked] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);

  const route = useRoute();
  const { item } = route.params;

  function changePasswordAction() {
    setModalVisible(false);
    navigation.navigate("EditUserPasswordPage");
  }

  function updateModalContent(content) {

    switch (content) {
      case "disable-user":
        setModalContent((<DisableUserModalContent disableAction={() => updateModalContent("confirm-user-disabled")} backAction={() => updateModalContent()} />))
        break;
      case "confirm-user-disabled":
        setModalContent((<ConfirmUserDisabledModalContent backAction={() => navigation.pop(2)} />))
        break;
      case "delete-user":
        setModalContent((<DeleteUserModalContent deleteAction={() => updateModalContent("confirm-user-deleted")} backAction={() => updateModalContent()} />));
        break;
      case "confirm-user-deleted":
        setModalContent((<ConfirmUserDeletedModalContent backAction={() => navigation.pop(2)}/>))
        break;
      default:
        setModalContent((
          <OptionsModalContent
            changePasswordAction={changePasswordAction}
            disableAction={() => updateModalContent("disable-user")}
            deleteAction={() => updateModalContent("delete-user")}
            backAction={backAction}>
          </OptionsModalContent>));
        break;
    }
  }

  function backAction() {
    updateModalContent();
    setModalVisible(false);
  }

  React.useEffect(() => {
    updateModalContent("main");
  }, [])

  return (
    <View className="flex-1 w-full bg-primary-600">

      <CustomModal visible={modalVisible}>
        {modalContent}
      </CustomModal>

      <Header />
      <View className="flex w-full justify-center items-center mt-20 py-10">
        <Image className="object-contain object-center h-36 w-36" source={logo} />
      </View>
      <View className="flex-1 w-full flex-col justify-end items-center mt-20 border">
        <AdjustableModal keyboardVerticalOffset={-200}>
          <View className="flex h-full w-full">
            <View className="flex flex-row justify-between align-center">
              <View>
                <Text className="text-3xl font-bold text-primary-800 mb-1">Nome</Text>
                <Text className="text-sm font-semibold mb-5">Alterar dados do funcionário</Text>
              </View>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Icon name="cog" size={36} color="#1E3F42" />
              </Pressable>
            </View>
            <Input className="mb-2" value="" label="Nome" placeholder="digite o nome completo" setInputValue={() => { }} />
            <ErrorMessage show={false} message="CPF ou senha inválidos!" />
            <Input className="mb-2" value="" label="CPF" placeholder="000.000.000-00" keyboardType="numeric" mask="999.999.999-99" setInputValue={() => { }} />
            <ErrorMessage show={false} message="CPF ou senha inválidos!" />
            <Input className="mb-2" label="Jornada de trabalho" placeholder="00:00" keyboardType="numeric" mask="99:99" setInputValue={() => { }} />
            <ErrorMessage show={false} message="CPF ou senha inválidos!" />
            <Input className="mb-2" label="Tempo de almoço" placeholder="00:00" keyboardType="numeric" mask="99:99" setInputValue={() => { }} />
            <ErrorMessage show={false} message="CPF ou senha inválidos!" />
            <View className="flex flex-row items-center mb-2">
              <Checkbox color="#1E3F42" status={checked ? "checked" : "unchecked"}
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text className="text-sm font-bold">Funcionário Administrador?</Text>
            </View>
            <Button title="Salvar alterações" color="primary-600" />
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

function OptionsModalContent({ changePasswordAction, disableAction, deleteAction, backAction }) {
  return (
    <View>
      <Button className="mb-5" title="Alterar senha de acesso" color="primary-400"
        icon={<Icon name="lock-reset" color="white" size={24} style={{ marginRight: 6 }} />}
        onPress={changePasswordAction}
      />
      <Button style={{ backgroundColor: "#475569" }} className="mb-5" title="Desabilitar funcionário" color="slate-700"
        icon={<Icon name="account-cancel-outline" color="white" size={24} style={{ marginRight: 6 }} />}
        onPress={disableAction}
      />
      <Button style={{ backgroundColor: "#dc2626" }} className="mb-5" title="Excluir funcionário"
        icon={<Icon name="delete-forever" color="white" size={24} style={{ marginRight: 6 }} />}
        onPress={deleteAction}
      />
      <Divider />
      <Button className="mt-5" title="Voltar" type="outline" color="primary-400"
        onPress={backAction}
      />
    </View>
  );
}

function DisableUserModalContent({ disableAction, backAction }) {
  return (
    <View>
      <Text className="text-3xl font-bold text-primary-800 mb-1">Desabilitar funcionário?</Text>
      <Text className="text-sm font-semibold mb-5">Desabilitar um funcionário impede que ele acesse a plataforma.</Text>
      <Button style={{ backgroundColor: "#475569" }} className="mb-5" title="Desabilitar funcionário" color="slate-700"
        icon={<Icon name="account-cancel-outline" color="white" size={24} style={{ marginRight: 6 }} />}
        onPress={disableAction}
      />
      <Divider />
      <Button className="mt-5" title="Voltar" type="outline" color="primary-400"
        onPress={backAction}
      />
    </View>
  );
}

function ConfirmUserDisabledModalContent({ backAction }) {
  return (
    <View>
      <Text className="text-2xl font-bold text-primary-800 mb-1">Funcionário desabilitado</Text>
      <Text className="text-sm font-semibold mb-5">Volte para a lista de funcionários para reabilita-lo.</Text>
      <Divider />
      <Button className="mt-5" title="Ok" type="outline" color="primary-400"
        onPress={backAction}
      />
    </View>
  );
}

function DeleteUserModalContent({ deleteAction, backAction }) {
  return (
    <View>
      <Text className="text-3xl font-bold text-danger-600 mb-1">Excluir funcionário?</Text>
      <Text className="text-sm font-semibold mb-5">Essa ação deleta o usuário da plataforma e é irreversível.</Text>
      <Button style={{ backgroundColor: "#dc2626" }} className="mb-5" title="Excluir funcionário"
        icon={<Icon name="delete-forever" color="white" size={24} style={{ marginRight: 6 }} />}
        onPress={deleteAction}
      />
      <Divider />
      <Button className="mt-5" title="Voltar" type="outline" color="primary-400"
        onPress={backAction}
      />
    </View>
  );
}

function ConfirmUserDeletedModalContent({ backAction }) {
  return (
    <View>
      <Text className="text-3xl font-bold text-primary-800 mb-1">Funcionário deletado</Text>
      <Text className="text-sm font-semibold mb-5">Funcionário deletado permanentemente da plataforma.</Text>
      <Divider />
      <Button className="mt-5" title="Ok" type="outline" color="primary-400"
        onPress={backAction}
      />
    </View>
  );
}