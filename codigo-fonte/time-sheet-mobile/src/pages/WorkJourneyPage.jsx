import React from "react";
import { View, Text, Animated, ScrollView, TextInput } from "react-native";
import Header from "../components/Header";
import Fab from "../components/Fab";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MessageModal from "../components/MessageModal";
import { useNotification } from "../hooks/useNotification";
import { useDateTime } from "../hooks/useDateTime";
import { calcularTempoDecorrido, parseToDate } from "../common/utils";
import * as WorkJourneyService from "../services/WorkJourneyService";
import AuthContext from "../contexts/AuthContext";
import { createProofPDF } from "../services/pdfCreator";
import RefreshContext from "../contexts/RefreshContext";
import { useLocation } from "../hooks/useLocation";
import CustomModal from "../components/CustomModal";
import Button from "../components/Button";
import moment from "moment-timezone";

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

const status = {
  notInitialized: 0,
  workJourneyStarted: 1,
  lunchTimeStarted: 2,
  lunchTimeFinished: 3,
  workJourneyFinished: 4,
};

const workJourneyStartedModalData = {
  title: "Jornada de trabalho iniciada",
  message: "Lembre de voltar aqui para finaliza-la ou iniciar seu horário de almoço.",
  iconName: "clock-outline",
};

const workJourneyFinishedModalData = {
  title: "Jornada de trabalho finalizada",
  message: "Volte amanhã para inicar novamente.",
  iconName: "clock-check-outline",
};

const lunchTimeStartedModalData = {
  title: "Horário de almoço iniciado",
  message: "Lembre de voltar aqui para finalizar o seu horário de almoço.",
  iconName: "food-apple-outline",
};

const lunchTimeFinishedModalData = {
  title: "Horário de almoço finalizado",
  message: "Lembre de voltar aqui para finalizar sua jornada de trabalho.",
  iconName: "food-apple-outline",
};

const serverErrorModalData = {
  title: "Erro ao se comunicar com o servidor",
  message: "Verifique sua conexão com a internet e tente novamente.",
  iconName: "alert-circle-outline",
};

export default function WorkJourneyPage() {
  const [waitingResponse, setWaitingResponse] = React.useState();
  const [WorkJourneyInProgress, setWorkJourneyInProgress] =
    React.useState(null);
  const [workJourneyElapsedTime, setWorkJourneyElapsedTime] =
    React.useState(null);
  const [LunchTimeElapsedTime, setLunchTimeElapsedTime] = React.useState(null);
  const [currentStatus, setCurrentStatus] = React.useState(
    status.notInitialized
  );

  const { date, formatDate, time, formatTime } = useDateTime();
  const { userData } = React.useContext(AuthContext);
  const [serverTime, setServerTime] = React.useState();
  const [just, setJust] = React.useState("Não finalizei meu registro de ponto.");
  const { visible, showNotification } = useNotification(5);
  const [messageModalData, setMessageModalData] = React.useState(null);
  const { updateRefresh } = React.useContext(RefreshContext);
  const { location, checkLocation } = useLocation();
  const [modalVisible, setModalVisible] = React.useState(false);

  function updateElapsedTime(WorkJourneyInProgress, currentStatus) {
    var totalHours = 0;
    var totalMinutes = 0;

    const currentTime = parseToDate(serverTime.time, serverTime.date);

    const startTime = parseToDate(
      WorkJourneyInProgress.startTime,
      serverTime.date
    );

    const startLunchTime = parseToDate(
      WorkJourneyInProgress.startLunchTime,
      serverTime.date
    );
    const finishLunchTime = parseToDate(
      WorkJourneyInProgress.endLunchTime,
      serverTime.date
    );
    const endTime = parseToDate(WorkJourneyInProgress.endTime, serverTime.date);

    const difMiliseconds =
      currentStatus === status.workJourneyStarted
        ? currentTime - startTime
        : startLunchTime - startTime;
    const difMinutes = Math.floor(difMiliseconds / (1000 * 60));
    const hoursBeforeLunch = Math.max(Math.floor(difMinutes / 60), 0);
    const minutesBeforeLunch = Math.max(difMinutes % 60, 0);

    totalHours += hoursBeforeLunch;
    totalMinutes += minutesBeforeLunch;

    if (currentStatus >= status.lunchTimeStarted) {
      const difLunchMiliseconds =
        currentStatus === status.lunchTimeStarted
          ? currentTime - startLunchTime
          : finishLunchTime - startLunchTime;
      const difLunchMinutes = Math.floor(difLunchMiliseconds / (1000 * 60));
      const hoursLunch = Math.max(Math.floor(difLunchMinutes / 60), 0);
      const minutesLunch = Math.max(difLunchMinutes % 60, 0);

      setLunchTimeElapsedTime(
        `${hoursLunch.toString().padStart(2, "0")}:${minutesLunch
          .toString()
          .padStart(2, "0")}`
      );
    }

    if (currentStatus >= status.lunchTimeFinished) {
      const difMiliseconds =
        currentStatus === status.lunchTimeFinished
          ? currentTime - finishLunchTime
          : endTime - finishLunchTime;
      const difMinutes = Math.floor(difMiliseconds / (1000 * 60));
      const hoursAfterLunch = Math.max(Math.floor(difMinutes / 60), 0);
      const minutesAfterLunch = Math.max(difMinutes % 60, 0);

      totalHours += hoursAfterLunch;
      totalMinutes += minutesAfterLunch;
    }

    setWorkJourneyElapsedTime(
      `${totalHours.toString().padStart(2, "0")}:${totalMinutes
        .toString()
        .padStart(2, "0")}`
    );
  }

  function updateWorkJourneyInProgress() {
    setWaitingResponse(true);

    WorkJourneyService.inProgress().then((result) => {
      if (result.status === "NotFound") {
        setCurrentStatus(status.notInitialized);
        setWorkJourneyInProgress(null);
      } else {
        setWorkJourneyInProgress(result);
        switch (result.status) {
          case "WorkJourneyStarted":
            if (result.date !== serverTime.date) {
              setModalVisible(true);
              setCurrentStatus(status.notInitialized);
            } else {
              setCurrentStatus(status.workJourneyStarted);
              updateElapsedTime(result, status.workJourneyStarted);
            }
            break;
          case "LunchTimeStarted":
            if (result.date !== serverTime.date) {
              setModalVisible(true);
              setCurrentStatus(status.notInitialized);
            } else {
              setCurrentStatus(status.lunchTimeStarted);
              updateElapsedTime(result, status.lunchTimeStarted);
            }
            break;
          case "LunchTimeFinished":
            if (result.date !== serverTime.date) {
              setModalVisible(true);
              setCurrentStatus(status.notInitialized);
            } else {
              setCurrentStatus(status.lunchTimeFinished);
              updateElapsedTime(result, status.lunchTimeFinished);
            }
            break;
          case "WorkJourneyFinished":
            if (result.date !== serverTime.date) {
              setCurrentStatus(status.notInitialized);
              setWorkJourneyInProgress(null);
            } else {
              setCurrentStatus(status.workJourneyFinished);
              updateElapsedTime(result, status.workJourneyFinished);
            }
            break;
          default:
            setCurrentStatus(status.notInitialized);
            break;
        }
      }

      setWaitingResponse(false);
    });
  }

  function saveWorkJourneyInProgress() {

    const date = new moment();

    WorkJourneyService.journeys(date.year(), date.month() + 1).then(
      (result) => {
        createProofPDF(date, userData, WorkJourneyInProgress, result.workJourneys, just)
          .then(() => {
            setModalVisible(false);
          })
      }
    );
  }

  function startWorkJourney() {
    setWaitingResponse(true);

    WorkJourneyService.startWorkJourney().then((result) => {
      if (result.status === "WorkJourneyStarted") {
        setCurrentStatus(status.workJourneyStarted);
        setMessageModalData(workJourneyStartedModalData);
        showNotification();
        updateWorkJourneyInProgress();
      } else {
        setMessageModalData(serverErrorModalData);
        showNotification();
        updateWorkJourneyInProgress();
      }
    });
  }

  function startLunchTime() {
    setWaitingResponse(true);

    WorkJourneyService.startLunchTime().then((result) => {
      if (result.status === "LunchTimeStarted") {
        setCurrentStatus(status.lunchTimeStarted);
        setMessageModalData(lunchTimeStartedModalData);
        showNotification();
        updateWorkJourneyInProgress();
      } else {
        setMessageModalData(serverErrorModalData);
        showNotification();
        updateWorkJourneyInProgress();
      }
    });
  }

  function finishLunchTime() {
    setWaitingResponse(true);

    WorkJourneyService.finishLunchTime().then((result) => {
      if (result.status === "LunchTimeFinished") {
        setCurrentStatus(status.lunchTimeFinished);
        setMessageModalData(lunchTimeFinishedModalData);
        showNotification();
        updateWorkJourneyInProgress();
      } else {
        setMessageModalData(serverErrorModalData);
        showNotification();
        updateWorkJourneyInProgress();
      }
    });
  }

  function finishWorkJourney() {
    setWaitingResponse(true);

    WorkJourneyService.finishWorkJourney().then((result) => {
      if (result.status === "WorkJourneyFinished") {
        setCurrentStatus(status.workJourneyFinished);
        setMessageModalData(workJourneyFinishedModalData);
        showNotification();
        updateWorkJourneyInProgress();
        updateRefresh();
      } else {
        setMessageModalData(serverErrorModalData);
        showNotification();
        updateWorkJourneyInProgress();
      }
    });
  }

  function updateServerTime() {

    WorkJourneyService.serverTime().then((result) => {
      if (result.status === "Success") {
        const serverDateTime = parseToDate(result.time, result.date);

        formatDate(serverDateTime);
        formatTime(serverDateTime);
        setServerTime({
          date: result.date,
          time: result.time,
        });
      } else {
        setMessageModalData(serverErrorModalData);
        showNotification();
      }
    });
  }

  React.useEffect(() => {
    updateServerTime();

    const intervalId = setInterval(updateServerTime, 60000);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    function updateLocation() {
      checkLocation().then((result) => {

        if (result === 1) {
          setMessageModalData({
            title: "Localização inválida",
            message: "Você precisa estar na empresa para bater o ponto!",
            iconName: "map-marker-off"
          })
        } else
        if (result === 2) {
          setMessageModalData({
            title: "Localização bloqueada",
            message: "Você precisa permitir o uso da localização nas configurações.",
            iconName: "map-marker-off"
          })
        }
      })
    }
    updateLocation();
    const intervalId = setInterval(updateLocation, 30000);

    return () => clearInterval(intervalId);

  }, [])

  React.useEffect(() => {
    if (serverTime !== undefined) {
      updateWorkJourneyInProgress();
    }
  }, [serverTime]);

  return (
    <View className="flex-1 bg-primary-600">
      <Header />

      <CustomModal visible={modalVisible}>
        <View className="flex flex-col">
          <Text className="text-2xl font-bold text-primary-400 mb-1">
            Jornada perdida
          </Text>
          <Text className="text-sm font-semibold mb-5">
            Você esqueceu de finalizar sua jornada anterior,
            por favor salve o registro e envie para o administrador.
          </Text>

          <View className="flex flex-col grow mb-2">
            <Text className="mb-1">
              Início da jornada de trabalho
            </Text>
            <View className="flex items-center justify-center bg-primary-400 rounded-lg py-2">
              <Text className="text-stone-200 text-xl font-bold">{WorkJourneyInProgress?.startTime}</Text>
            </View>
          </View>

          <View className="flex flex-col grow mb-2">
            <Text className="mb-1">
              Início do horário de almoço
            </Text>
            <View className="flex items-center justify-center bg-primary-400 rounded-lg py-2">
              <Text className="text-stone-200 text-xl font-bold">{currentStatus >= status.lunchTimeStarted ? WorkJourneyInProgress?.startLunchTime : "Não registrado"}</Text>
            </View>
          </View>

          <View className="flex flex-col grow mb-2">
            <Text className="mb-1">
              Final do horário de almoço
            </Text>
            <View className="flex items-center justify-center bg-primary-400 rounded-lg py-2">
              <Text className="text-stone-200 text-xl font-bold">{currentStatus >= status.lunchTimeFinished ? WorkJourneyInProgress?.endLunchTime : "Não registrado"}</Text>
            </View>
          </View>

          <View className="flex flex-col grow mb-2">
            <Text className="mb-1">
              Final da jornada de trabalho
            </Text>
            <View className="flex items-center justify-center bg-primary-400 rounded-lg py-2">
              <Text className="text-stone-200 text-xl font-bold">{currentStatus >= status.workJourneyFinished ? WorkJourneyInProgress?.endTime : "Não registrado"}</Text>
            </View>
          </View>

          <View className="flex flex-col grow mb-2">
            <Text className="mb-1">
              Justificativa (Opcional)
            </Text>
            <TextInput
              className="border border-primary-400 rounded-lg p-2 items-start"
              onChangeText={(text) => setJust(text)}
              editable
              multiline
              numberOfLines={4}
              maxLength={150}>Não finalizei meu registro de ponto.
            </TextInput>
          </View>

          <Button
            onPress={saveWorkJourneyInProgress}
            className="mt-5"
            title="Salvar"
            color="primary-600"
            type="outline"
          />
        </View>
      </CustomModal>


      <View
        className="flex flex-col bg-primary-400 pt-3 shadow drop-shadow-xl border-b-2 border-primary-600"
        style={{ zIndex: 100 }}
      >
        <View className="bg-white inline p-1 pr-10 rounded-r-full self-start">
          <Text className="text-lg font-semibold w-min text-primary-600 inline">
            {userData.name}
          </Text>
        </View>
        <Text className="text-stone-200 text-3xl font-bold w-full text-center">
          {time}
        </Text>
        <Text className="text-stone-200 text-base font-bold text-right  mr-3 mb-1">
          {date}
        </Text>
      </View>

      <ScrollView className="flex-1 flex-col px-5">
        {currentStatus >= status.workJourneyStarted &&
          (!waitingResponse || WorkJourneyInProgress) && (
            <View className="flex flex-row mb-3 mt-5">
              <View className="flex flex-col mr-3 grow">
                <Text className="text-stone-200 mb-1">
                  Início da jornada de trabalho
                </Text>
                <View className="flex items-center justify-center bg-primary-400 rounded-lg py-3">
                  <Text className="text-stone-200 text-2xl font-bold">
                    {WorkJourneyInProgress?.startTime}
                  </Text>
                </View>
              </View>

              <View className="flex flex-col self-end">
                <Text className="text-stone-200 mb-1">Tempo</Text>
                <View className="flex items-center justify-center bg-primary-400 rounded-lg py-3 px-5">
                  <Text className="text-stone-200 text-2xl font-bold">
                    {workJourneyElapsedTime}
                  </Text>
                </View>
              </View>
            </View>
          )}

        {currentStatus >= status.lunchTimeStarted &&
          (!waitingResponse || WorkJourneyInProgress) && (
            <View className="flex flex-row mb-3">
              <View className="flex flex-col mr-3 grow">
                <Text className="text-stone-200 mb-1">
                  Início do horário de almoço
                </Text>
                <View className="flex items-center justify-center bg-primary-400 rounded-lg py-3">
                  <Text className="text-stone-200 text-2xl font-bold">
                    {WorkJourneyInProgress.startLunchTime}
                  </Text>
                </View>
              </View>

              <View className="flex flex-col self-end">
                <Text className="text-stone-200 mb-1">Tempo</Text>
                <View className="flex items-center justify-center bg-primary-400 rounded-lg py-3 px-5">
                  <Text className="text-stone-200 text-2xl font-bold">
                    {LunchTimeElapsedTime}
                  </Text>
                </View>
              </View>
            </View>
          )}

        {currentStatus >= status.lunchTimeFinished &&
          (!waitingResponse || WorkJourneyInProgress) && (
            <View className="flex flex-row mb-3">
              <View className="flex flex-col mr-3 w-full">
                <Text className="text-stone-200 mb-1">
                  Final do horário de almoço
                </Text>
                <View className="flex items-center justify-center bg-primary-400 rounded-lg py-3">
                  <Text className="text-stone-200 text-2xl font-bold">
                    {WorkJourneyInProgress.endLunchTime}
                  </Text>
                </View>
              </View>
            </View>
          )}

        {currentStatus === status.workJourneyFinished &&
          WorkJourneyInProgress && (
            <View className="flex flex-row mb-14">
              <View className="flex flex-col mr-3 w-full">
                <Text className="text-stone-200 mb-1">
                  Final da jornada de trabalho
                </Text>
                <View className="flex items-center justify-center bg-primary-400 rounded-lg py-3">
                  <Text className="text-stone-200 text-2xl font-bold">
                    {WorkJourneyInProgress.endTime}
                  </Text>
                </View>
              </View>
            </View>
          )}
      </ScrollView>

      {(location === 0) && currentStatus === status.notInitialized && (
        <Fab position={{ right: 20, bottom: 20 }} onPress={startWorkJourney}>
          <View className="flex flex-row justify-center items-center">
            <Icon name="clock-outline" size={24} color="#59A093" />
            <Text className="text-white pl-2">Iniciar jornada de trabalho</Text>
          </View>
        </Fab>
      )}

      {(location === 0) && !visible && currentStatus === status.workJourneyStarted && (
        <View className="flex">
          <Fab position={{ right: 20, bottom: 20 }} onPress={startLunchTime}>
            <View className="flex flex-row justify-center items-center">
              <Icon name="food-apple-outline" size={24} color="#59A093" />
              <Text className="text-white pl-2">Iniciar horário de almoço</Text>
            </View>
          </Fab>
        </View>
      )}

      {(location === 0) && !visible && currentStatus === status.lunchTimeStarted && (
        <Fab position={{ right: 20, bottom: 20 }} onPress={finishLunchTime}>
          <View className="flex flex-row justify-center items-center">
            <Icon name="food-apple-outline" size={24} color="#59A093" />
            <Text className="text-white pl-2">Finalizar horário de almoço</Text>
          </View>
        </Fab>
      )}

      {(location === 0) && !visible && currentStatus === status.lunchTimeFinished && (
        <Fab position={{ right: 20, bottom: 20 }} onPress={finishWorkJourney}>
          <View className="flex flex-row justify-center items-center">
            <Icon name="clock-check-outline" size={24} color="#59A093" />
            <Text className="text-white pl-2">
              Finalizar jornada de trabalho
            </Text>
          </View>
        </Fab>
      )}

      {((messageModalData !== null) && (visible || location !== 0)) && (
        <MessageModal
          title={messageModalData?.title}
          message={messageModalData?.message}
          iconName={messageModalData?.iconName}
        />
      )}
    </View>
  );
}