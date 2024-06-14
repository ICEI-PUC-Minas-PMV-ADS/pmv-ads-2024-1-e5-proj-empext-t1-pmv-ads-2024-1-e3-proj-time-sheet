import React from "react";
import { Pressable, Text, View, ActivityIndicator } from "react-native";
import Header from "../components/Header";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Fab from "../components/Fab";
import CustomModal from "../components/CustomModal";
import Button from "../components/Button";
import Divider from "../components/Divider";
import UserContext from "../contexts/UserContext";
import { AlertModalContent, InfoModalContent } from "../components/ModalContents";

import * as UserService from "../services/UserService";
import { FlatList } from "react-native";

export default function UsersPage({ navigation }) {
  const [currentPage, setCurrentPage] = React.useState("user-active");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeUsers, setActiveUsers] = React.useState(null);
  const [inactiveUsers, setInactiveUsers] = React.useState(null);
  const [waitingResponse, setWaitingResponse] = React.useState(false);
  const { users, updateUsers } = React.useContext(UserContext);

  function enableUser(userId, userName) {
    setWaitingResponse(true);

    UserService.enableUser(userId).then((result) => {
      switch (result.status) {
        case "UserEnabled":
          setModalContent(
            <InfoModalContent
              title={userName}
              message="O Funcionário foi habilitado e já pode acessar a plataforma novamente."
              goBack={() => {
                setModalVisible(false);
                setCurrentPage("user-active");
                updateUsers();
              }}
            />
          );
          break;
        default:
          setModalContent(
            <AlertModalContent
              title="Erro ao se comunicar com o servidor"
              message="Verifique sua conexão com a internet e tente novamente."
              goBack={() => {
                setModalVisible(false);
                setCurrentPage("user-active");
                updateUsers();
              }}
            />
          );
          break;
      }

      setWaitingResponse(false);
    });
  }

  React.useEffect(() => {

    if (users) {
      setActiveUsers(users.filter((user) => user.status === "Active"));
      setInactiveUsers(
        users.filter((user) => user.status === "Inactive")
      );
      setIsLoading(false);
    }
  }, [users]);

  function showModal(userId, userName) {
    setModalContent(
      <EnableUserModalContent
        userName={userName}
        waitingResponse={waitingResponse}
        enableUser={() => enableUser(userId, userName)}
        backAction={() => {
          setModalVisible(false);
          updateUsers();
        }}
      />
    );
    setModalVisible(true);
  }

  return (
    <View className="flex-1 w-full bg-primary-600">
      <CustomModal visible={modalVisible}>{modalContent}</CustomModal>

      <Header navigation={navigation} />
      <View className="flex flex-row w-full py-5 px-2">
        <Pressable
          onPress={() => setCurrentPage("user-active")}
          className={`flex flex-row items-center ${currentPage == "user-active" ? "bg-primary-400" : ""
            } p-2 rounded-lg`}
        >
          <Icon name="account-circle-outline" color="white" size={24} />
          <Text className="text-sm text-white ml-1">Usuários ativos</Text>
        </Pressable>
        <Pressable
          onPress={() => setCurrentPage("user-inactive")}
          className={`flex flex-row items-center ml-2 ${currentPage == "user-inactive" ? "bg-primary-400" : ""
            } p-2 rounded-lg`}
        >
          <Icon name="account-cancel-outline" color="white" size={24} />
          <Text className="text-sm text-white ml-1">Usuários inativos</Text>
        </Pressable>
      </View>

      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={64} color="#59A093" />
        </View>
      ) : (
        <View className="flex-1 flex-col relative">
          {currentPage == "user-inactive" ? (
            <FlatList
              data={inactiveUsers}
              renderItem={({ item }) => (
                <View className="flex flex-row w-full bg-primary-400 px-4 py-2 items-center border border-primary-600">
                  <View className="flex-1 flex-col items-start justify-center">
                    <Text className="text-base text-white">{item.name}</Text>
                    <Text className="text-primary-100 leading-none">
                      {item.role === "Administrator" ? "Administrador" : "Funcionário"}
                    </Text>
                  </View>
                  <Pressable
                    className="flex flex-row items-center"
                    onPress={() => showModal(item.id, item.name)}
                  >
                    <Icon
                      name="account-reactivate-outline"
                      color="white"
                      size={24}
                    />
                    <Text className="text-sm text-white ml-2">Habilitar</Text>
                  </Pressable>
                </View>
              )}
            />
          ) : (
            <FlatList
              data={activeUsers}
              renderItem={({ item }) => (
                <View className="flex flex-row w-full bg-primary-400 px-4 py-2 items-center border border-primary-600">
                  <View className="flex-1 flex-col items-start justify-center">
                    <Text className="text-base text-white">{item.name}</Text>
                    <Text className="text-primary-100 leading-none">
                      {item.role === "Administrator" ? "Administrador" : "Funcionário"}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("EditUserPage", { item, updateUsers })
                    }
                    className="flex flex-row items-center"
                  >
                    <Icon name="pencil" color="white" size={24} />
                    <Text className="text-sm text-white ml-2">Editar</Text>
                  </Pressable>
                </View>
              )}
            />
          )}

          <Fab onPress={() =>
            navigation.navigate("CadastreUserPage", { updateUsers })
          }>
            <View className="flex flex-row justify-center items-center">
              <Icon name="plus" size={24} color="#59A093" />
              <Text className="text-white pl-2">
                Cadastrar novo funcionário
              </Text>
            </View>
          </Fab>
        </View>
      )}
    </View>
  );
}

function EnableUserModalContent({
  userName,
  enableUser,
  waitingResponse,
  backAction,
}) {
  return (
    <View>
      <Text className="text-2xl font-bold text-primary-800 mb-1">
        {userName}
      </Text>
      <Text className="text-sm font-semibold mb-5">
        Reabilitar um funcionário permite que ele acesse a plataforma novamente.
      </Text>
      <Button
        className="mb-5"
        title="Reabilitar funcionário"
        color="primary-400"
        icon={
          <Icon
            name="account"
            color="white"
            size={24}
            style={{ marginRight: 6 }}
          />
        }
        onPress={enableUser}
      />
      <Divider />
      <Button
        className="mt-5"
        disabled={waitingResponse}
        isRunning={waitingResponse}
        title="Voltar"
        type="outline"
        color="primary-400"
        onPress={backAction}
      />
    </View>
  );
}