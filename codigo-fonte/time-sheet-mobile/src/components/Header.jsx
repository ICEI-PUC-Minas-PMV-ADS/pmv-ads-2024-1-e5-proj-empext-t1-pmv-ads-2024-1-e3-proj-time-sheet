import React from "react";
import { View, Text, Pressable } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AuthContext from '../contexts/AuthContext';

import * as AuthService from '../services/AuthService';

export default function Header({ navigation }) {

    const { userData, validateUser } = React.useContext(AuthContext);

    function handleLogout() {
        AuthService.logout()
            .then(response => {
                validateUser();
            });
    }

    return (
        <View className="flex flex-row items-center w-full bg-primary-800 pt-10 px-3 pb-3">
            <View className="bg-primary-400 p-1 rounded-full">
                <Icon name="account-outline" color="white" size={36} />
            </View>
            <View className="flex-1 flex-col ml-3">
                <Text className="text-base text-white leading-none">{userData.name}</Text>
                <Text className="text-primary-100 leading-none">{userData.role}</Text>
            </View>
            <Pressable className="flex flex-row" onPress={handleLogout}>
                <Icon name="logout" color="#9ABEA4" size={24} />
                <Text className="text-base text-white ml-1">Sair</Text>
            </Pressable>
        </View>
    );
}