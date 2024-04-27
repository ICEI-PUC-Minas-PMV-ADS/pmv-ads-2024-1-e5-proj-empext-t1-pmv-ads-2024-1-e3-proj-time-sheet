import React from "react";
import { View, Text } from "react-native";
import Header from "../components/Header";
import Fab from "../components/Fab";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function WorkJourneyPage() {
  return (
    <View className="flex-1 bg-primary-600">
      <Header/>

      <View className="flex flex-col bg-primary-400 pt-3 shadow">
        <View className="bg-white inline p-3 pr-10 rounded-r-full self-start">
          <Text className="text-lg font-semibold w-min text-primary-600 inline">Carlos Almeida</Text>
        </View>
        <Text className="text-stone-200 text-4xl font-bold w-full text-center my-3">17:00</Text>
        <Text className="text-stone-200 text-lg font-bold text-right  mr-3 mb-1">Terça, 25 de Abril</Text>
      </View>

      <View className="flex-1 flex-col p-5">
        <View className="flex flex-row mb-3">
          <View className="flex flex-col mr-3 grow">
            <Text className="text-stone-200 mb-1">Início da jornada de trabalho</Text>
            <View className="flex items-center justify-center bg-primary-400 rounded-lg py-3">
              <Text className="text-stone-200 text-2xl font-bold">08:00</Text>
            </View>
          </View>

          <View className="flex flex-col self-end">
            <Text className="text-stone-200 mb-1">Tempo</Text>
            <View className="flex items-center justify-center bg-primary-400 rounded-lg py-3 px-5">
              <Text className="text-stone-200 text-2xl font-bold">08:00</Text>
            </View>
          </View>
        </View>

        <View className="flex flex-row mb-3">
          <View className="flex flex-col mr-3 grow">
            <Text className="text-stone-200 mb-1">Início do horário de almoço</Text>
            <View className="flex items-center justify-center bg-primary-400 rounded-lg py-3">
              <Text className="text-stone-200 text-2xl font-bold">12:00</Text>
            </View>
          </View>

          <View className="flex flex-col self-end">
            <Text className="text-stone-200 mb-1">Tempo</Text>
            <View className="flex items-center justify-center bg-primary-400 rounded-lg py-3 px-5">
              <Text className="text-stone-200 text-2xl font-bold">00:45</Text>
            </View>
          </View>
        </View>

        
        <View className="flex flex-row mb-3">
          <View className="flex flex-col mr-3 w-full">
            <Text className="text-stone-200 mb-1">Final do horário de almoço</Text>
            <View className="flex items-center justify-center bg-primary-400 rounded-lg py-3">
              <Text className="text-stone-200 text-2xl font-bold">13:00</Text>
            </View>
          </View>
        </View>

        <View className="flex flex-row">
          <View className="flex flex-col mr-3 w-full">
            <Text className="text-stone-200 mb-1">Final da jornada de trabalho</Text>
            <View className="flex items-center justify-center bg-primary-400 rounded-lg py-3">
              <Text className="text-stone-200 text-2xl font-bold">17:00</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="flex">
        <Fab position={{left: 20, bottom: 20}}>
          <View className="flex flex-row justify-center items-center">
            <Icon name="clock-check-outline" size={24} color="#59A093"/>
            <Text className="text-white pl-2">Finalizar jornada de trabalho</Text>
          </View>
        </Fab>
        <Fab position={{right: 20, bottom: 90}}>
          <View className="flex flex-row justify-center items-center">
            <Icon name="food-apple-outline" size={24} color="#59A093"/>
            <Text className="text-white pl-2">Iniciar horário de almoço</Text>
          </View>
        </Fab>
      </View>

    </View>
  );
}
