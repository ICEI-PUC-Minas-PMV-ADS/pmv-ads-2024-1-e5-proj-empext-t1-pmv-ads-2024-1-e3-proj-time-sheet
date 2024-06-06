import React from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../components/Header";
import Fab from "../components/Fab";
import RefreshContext from "../contexts/RefreshContext";

export default function TimeSheetDetailsPage({ navigation }) {

    const route = useRoute();
    const { userId, workJourneys } = route.params;
    const { refresh } = React.useContext(RefreshContext);

    React.useEffect(() => {

        

    }, [refresh]);

    return (
        <View className="flex-1 bg-primary-600">
            <Header />
            <View className="flex flex-row bg-white justify-between items-center p-3">
                <Pressable className="w-10" onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={36} color="#1E3F42" />
                </Pressable>
                <View className="flex justify-center items-center">
                    <Text className="text-xl text-primary-800 font-bold">Gabriel Almeida</Text>
                    <Text className="text-base text-primary-800 font-bold">Março 2024</Text>
                </View>
                <View className="w-10"></View>
            </View>
            <View className="flex w-full flex-row items-center bg-primary-800 border  border-b-white p-2">
                <View className="flex justify-center items-center w-8 h-8 bg-primary-400 rounded">
                    <Text className="text-base font-bold text-white">Dia</Text>
                </View>
                <View className="flex-1 flex-row justify-around w-80 pr-4">
                    <Text className="text-base text-primary-100">início</Text>
                    <Text className="text-base text-primary-100">saída</Text>
                    <Text className="text-base text-primary-100">retorno</Text>
                    <Text className="text-base text-primary-100">final</Text>
                </View>
                <View className="w-8"></View>
            </View>
            <FlatList
                className="w-full"
                contentContainerStyle={{paddingBottom: 80}}
                data={workJourneys}
                renderItem={({ item }) => (
                    <View className="flex flex-row items-center bg-primary-400 border border-primary-600 p-2">
                        <View className="flex justify-center items-center w-8 h-8 bg-primary-600 rounded">
                            <Text className="text-base font-bold text-white">{item.date.split("-")[2]}</Text>
                        </View>

                        {item.journeyType === 1 ? (
                            <View className="flex-1 flex-row justify-around w-80 pr-4">
                                <Text className="text-base text-white font-semibold">Atestado médico</Text>
                            </View>
                        ) : (
                            <View className="flex-1 flex-row justify-around w-80 pr-4">
                                <Text className="text-base text-white font-semibold">{item.startTime}</Text>
                                <Text className="text-base text-white font-semibold">{item.startLunchTime}</Text>
                                <Text className="text-base text-white font-semibold">{item.endLunchTime}</Text>
                                <Text className="text-base text-white font-semibold">{item.endTime}</Text>
                            </View>
                        )}

                        <View>
                            <Pressable className="flex justify-center items-center bg-primary-200 rounded" style={{ height: 24, width: 24 }}>
                                <Icon name="pencil" size={20} color="white" />
                            </Pressable>
                        </View>
                    </View>
                )}
            />
            <Fab onPress={() => navigation.navigate("TimeSheetAddPage", { userId })}>
                <View className="flex flex-row justify-center items-center">
                    <Icon name="clock-plus-outline" size={24} color="#59A093" />
                    <Text className="text-white pl-2">
                        Adicionar lançamento
                    </Text>
                </View>
            </Fab>
        </View>
    );
}