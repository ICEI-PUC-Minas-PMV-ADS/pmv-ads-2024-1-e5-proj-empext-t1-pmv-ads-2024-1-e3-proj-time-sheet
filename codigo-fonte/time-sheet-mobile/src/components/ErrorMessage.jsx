import React from "react";
import { View, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ErrorMessage({show, message}) {

    return (
        <View className={`flex flex-row items-center ${show ? "visible" : "hidden"}`}>
            <Icon name="alert-circle-outline" color="red" size={24}/>
            <Text className="text-sm font-semibold text-danger-600 ml-1">{message}</Text>
        </View>
    );
}