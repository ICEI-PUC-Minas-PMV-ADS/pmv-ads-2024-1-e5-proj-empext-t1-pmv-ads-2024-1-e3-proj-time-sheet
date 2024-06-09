import React, { useReducer, useState } from "react";
import {
  Pressable,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Header from "../components/Header";
import MonthSelectorCalendar from "react-native-month-selector";
import Fab from "../components/Fab";
import AuthContext from "../contexts/AuthContext";
import UserContext from "../contexts/UserContext";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment-timezone";
import { Checkbox } from "react-native-paper";
import * as WorkJourneyService from "../services/WorkJourneyService";
import RefreshContext from "../contexts/RefreshContext";
import { calculateJourneyStats } from "../services/JourneyService";

import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

import { Platform } from 'react-native';
import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function TimeSheetPage({ navigation }) {
  const { userData } = React.useContext(AuthContext);
  const { getUserName, users } = React.useContext(UserContext) ?? {
    getUserName: null,
    users: null,
  };

  const [date, setDate] = React.useState(null);
  const [dateFormatted, setDateFormatted] = React.useState();
  const [monthPickerVisible, setMothPickerVisible] = React.useState(false);
  const [workJourneys, setWorkJourneys] = React.useState(null);
  const [waitingResponse, setWaitingResponse] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [isAdministrator, setIsAdministrator] = React.useState(
    userData.role === "Administrator"
  );
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const { refresh, updateRefresh } = React.useContext(RefreshContext);

  function updateDate(date) {
    setDate(date);
    setDateFormatted(`${months[date.month()]}, ${date.year()}`);
    setMothPickerVisible(false);
  }

  function updateJourneys() {
    if (date) {
      setWaitingResponse(true);

      if (isAdministrator) {
        WorkJourneyService.alljourneys(
          date.year(),
          date.month() + 1,
          true
        ).then((result) => {
          setWorkJourneys(result.workJourneys);
          setWaitingResponse(false);
        });
      } else {
        WorkJourneyService.journeys(date.year(), date.month() + 1).then(
          (result) => {
            setWorkJourneys(result.workJourneys);
            setWaitingResponse(false);
          }
        );
      }
    }
  }

 // ----------------- Create PDF Function
  const createPDF = async () => {
    console.log(workJourneys)
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tabela de Registro de Ponto</title>
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          border: 1px solid black;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #f2f2f2;
        }
        .assinatura {
          margin-top: 80px;
          font-style: italic;
        }
      </style>
    </head>
    <div id="pdf-content">
    <body >

    <h2>Nome da Empresa</h2>
    <p>Nome do Funcionário</p>

    <table>
      <tr>
        <th>Dia</th>
        <th>Ponto de Entrada</th>
        <th>Entrada do Almoço</th>
        <th>Saída do Almoço</th>
        <th>Saída do Expediente</th>
      </tr>
      <tr>
        <td>01</td>
        <td>08:00</td>
        <td>12:00</td>
        <td>13:00</td>
        <td>19:00</td>
      </tr>
    </table>

    <p class="assinatura funcionario">Assinatura do Funcionário: ____________________________________.</p>
    <p class="assinatura">Assinatura do Dono da Empresa:______________________________________.</p>

    </body>
    </div>
    </html>
    `;
  
    if (Platform.OS === 'web') {
      const html2canvas = require("html2canvas")
      // Adicionar o conteúdo HTML ao DOM
      const container = document.createElement('div');
      container.innerHTML = htmlContent;
      document.body.appendChild(container);
  
      // Esperar o elemento ser renderizado e então capturar
      const element = document.getElementById('pdf-content');
      const canvas = await html2canvas(element, {
        scale: 2
      });
      const imgData = canvas.toDataURL('image/png');
  
      // Criar o PDF e adicionar a imagem
      const doc = new jsPDF('p', 'mm', 'a4');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('document.pdf');
  
      // Remover o conteúdo HTML do DOM
      document.body.removeChild(container);
    } else {
      // Geração de PDF no ambiente nativo
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log("File has been saved to:", uri);
      await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
    }
  };
  


  
  // -----------------

  React.useEffect(() => {
    updateDate(new moment());

    const intervalId = setInterval(updateJourneys, 30000);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    updateJourneys();
  }, [date]);

  React.useEffect(() => {
    forceUpdate();
  }, [users]);

  React.useEffect(() => {
    if (refresh) {
      updateJourneys();
      updateRefresh();
    }
  }, [refresh]);

  return (
    <View className="flex-1 bg-primary-600">
      <Header />
      <View className="flex bg-white justify-center items-center p-3">
        <Pressable onPress={() => setMothPickerVisible(true)}>
          <Text className="text-xl text-primary-800 font-bold">
            {dateFormatted}
          </Text>
        </Pressable>
      </View>
      <View className="flex-1 flex-column relative">
        {monthPickerVisible && (
          <View className="flex w-full absolute mt-5" style={{ zIndex: 100 }}>
            <View className="flex mx-5">
              <MonthSelectorCalendar
                selectedDate={date}
                onMonthTapped={updateDate}
                currentMonthTextStyle={{ color: "#59A093" }}
                selectedBackgroundColor="#1E3F42"
                containerStyle={{ borderRadius: 20 }}
              />
            </View>
          </View>
        )}

        <View className="flex-1 w-full items-center">
          {isAdministrator ? (
            <View className="flex w-full flex-row items-center bg-primary-800 border  border-b-white p-2">
              <View className="flex justify-center items-center w-8 h-8 bg-primary-400 rounded">
                <Text className="text-sm font-bold text-white">Dias</Text>
              </View>
              <View className="flex-1 flex-row justify-around pr-4">
                <Text className="text-base text-primary-100">h. trab</Text>
                <Text className="text-base text-primary-100">h. extras</Text>
                <Text className="text-base text-primary-100">h. total</Text>
                <Text className="text-base text-primary-100">atest.</Text>
              </View>
              <View>
                <Checkbox
                  color="white"
                  status={expanded ? "checked" : "unchecked"}
                  uncheckedColor="white"
                  onPress={() => setExpanded(!expanded)}
                />
              </View>
            </View>
          ) : (
            <View className="flex w-full flex-row items-center bg-primary-800 border  border-b-white p-2">
              <View className="flex justify-center items-center w-8 h-8 bg-primary-400 rounded">
                <Text className="text-base font-bold text-white">Dia</Text>
              </View>
              <View className="flex-1 flex-row justify-around pr-4">
                <Text className="text-base text-primary-100">início</Text>
                <Text className="text-base text-primary-100">saída</Text>
                <Text className="text-base text-primary-100">retorno</Text>
                <Text className="text-base text-primary-100">final</Text>
              </View>
              <View>
                <Checkbox
                  color="white"
                  status={expanded ? "checked" : "unchecked"}
                  uncheckedColor="white"
                  onPress={() => setExpanded(!expanded)}
                />
              </View>
            </View>
          )}

          {waitingResponse ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size={64} color="#59A093" />
            </View>
          ) : !workJourneys || workJourneys.length == 0 ? (
            <View className="flex-1 justify-center items-center">
              <Icon />
              <Text className="text-base text-white">
                Nenhum registro encontrado para a data selecionada.
              </Text>
            </View>
          ) : isAdministrator ? (
            <FlatList
              className="w-full pb-20"
              data={workJourneys}
              renderItem={({ item }) => (
                <ExpandableUserJourneyView
                  userName={getUserName(item.userId)}
                  userId={item.userId}
                  workJourneys={item.workJourneys}
                  expanded={expanded}
                  navigation={navigation}
                />
              )}
            />
          ) : (
            <FlatList
              className="w-full"
              data={workJourneys}
              renderItem={({ item }) => (
                <View className="flex flex-row items-center bg-primary-400 border border-primary-600 p-2">
                  <View className="flex justify-center items-center w-8 h-8 bg-primary-600 rounded">
                    <Text className="text-base font-bold text-white">
                      {item.date.split("-")[2]}
                    </Text>
                  </View>
                  <View className="flex-1 flex-row justify-around w-80 pr-4">
                    <Text className="text-base text-white font-semibold">
                      {item.startTime}
                    </Text>
                    <Text className="text-base text-white font-semibold">
                      {item.startLunchTime}
                    </Text>
                    <Text className="text-base text-white font-semibold">
                      {item.endLunchTime}
                    </Text>
                    <Text className="text-base text-white font-semibold">
                      {item.endTime}
                    </Text>
                  </View>
                  <View>
                    <Checkbox
                      color="white"
                      status={expanded ? "checked" : "unchecked"}
                      uncheckedColor="white"
                    />
                  </View>
                </View>
              )}
            />
          )}
        </View>
      </View>
      <Fab onPress={createPDF}>
        <View className="flex flex-row justify-center items-center">
          <Icon name="calendar-export" size={24} color="#59A093" />
          <Text className="text-white pl-2">Gerar relatório de horas</Text>
        </View>
      </Fab>
    </View>
  );
}

function ExpandableUserJourneyView({ userName, userId, workJourneys, expanded, navigation }) {
  const [isExpanded, setIsExpanded] = React.useState(expanded);

  React.useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  const stats = calculateJourneyStats(8, workJourneys);

  return (
    <View className="w-full">
      <View className="flex flex-row justify-between items-center bg-primary-200 w-full px-2 py-1">
        <View className="flex-1 flex-column justify-start">
          <Text className="text-base text-white font-semibold">{userName}</Text>
        </View>
        <Checkbox
          color="white"
          uncheckedColor="white"
          status={isExpanded ? "checked" : "unchecked"}
          onPress={() => {
            setIsExpanded(!isExpanded);
          }}
        />
      </View>
      <View className="flex w-full flex-row items-center bg-primary-400 p-2">
        <View className="flex justify-center items-center w-8 h-8 bg-primary-600 rounded">
          <Text className="text-base font-bold text-white">{stats.days}</Text>
        </View>
        <View className="flex-1 flex-row justify-around pr-4">
          <Text className="text-base text-white">{stats.workTime}</Text>
          <Text className="text-base text-white">{stats.extraTime}</Text>
          <Text className="text-base text-white">{stats.totalTime}</Text>
          <Text className="text-base text-white">{stats.certificates}</Text>
        </View>
        <View>
          <Pressable onPress={() => navigation.navigate("TimeSheetDetailsPage", { workJourneys, userId })} className="flex justify-center items-center bg-primary-200 rounded" style={{ height: 24, width: 24 }}>
            <Icon name="pencil" size={20} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
