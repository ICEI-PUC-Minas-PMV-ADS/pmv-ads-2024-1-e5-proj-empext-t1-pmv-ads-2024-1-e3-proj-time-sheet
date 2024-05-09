import React, { useReducer } from "react";
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

export default function TimeSheetPage() {
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

  return (
    <View className="flex-1 bg-primary-600">
      <Header />
      <View className="flex bg-white justify-center items-center p-5 mt-5">
        <Pressable onPress={() => setMothPickerVisible(true)}>
          <Text className="text-2xl text-primary-800 font-bold">
            {dateFormatted}
          </Text>
        </Pressable>
      </View>
      <View className="flex-1 flex-column relative mt-5">
        {monthPickerVisible && (
          <View className="flex w-full absolute" style={{ zIndex: 100 }}>
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
          <View className="flex w-full flex-row items-center border border-primary-600 py-2 pl-4">
            <View className="flex justify-center items-center w-10 h-10 bg-primary-400 rounded">
              <Text className="text-xl font-bold text-white">Dia</Text>
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
              className="w-full"
              data={workJourneys}
              renderItem={({ item }) => (
                <ExpandableUserJourneyView
                  userName={getUserName(item.userId)}
                  workJourneys={item.workJourneys}
                  expanded={expanded}
                />
              )}
            />
          ) : (
            <FlatList
              className="w-full"
              data={workJourneys}
              renderItem={({ item }) => (
                <View className="flex flex-row items-center bg-primary-400 border border-primary-600 py-2 pl-4">
                  <View className="flex justify-center items-center w-10 h-10 bg-primary-600 rounded">
                    <Text className="text-xl font-bold text-white">
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
      <Fab>
        <Icon size={36} name="calendar-export" color="#59A093" />
      </Fab>
    </View>
  );
}

function ExpandableUserJourneyView({ userName, workJourneys, expanded }) {
  const [isExpanded, setIsExpanded] = React.useState(expanded);

  React.useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  return (
    <View className="w-full">
      <View className="flex flex-row justify-between items-center bg-slate-200 w-full py-2 border border-primary-600">
        <View className="flex-1 flex-column justify-start pl-2">
          <Text className="text-xl text-primary-600 font-semibold">
            {userName}
          </Text>
          <Text className="text-base text-slate-400 font-semibold">
            Funcionário
          </Text>
        </View>
        <Checkbox
          color="#1E3F42"
          status={isExpanded ? "checked" : "unchecked"}
          onPress={() => {
            setIsExpanded(!isExpanded);
          }}
        />
      </View>
      {isExpanded && (
        <FlatList
          className="w-full"
          data={workJourneys}
          renderItem={({ item }) => (
            <View className="flex flex-row items-center bg-primary-400 border border-primary-600 py-2 pl-4">
              <View className="flex justify-center items-center w-10 h-10 bg-primary-600 rounded">
                <Text className="text-xl font-bold text-white">
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
                  status={isExpanded ? "checked" : "unchecked"}
                  uncheckedColor="white"
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
