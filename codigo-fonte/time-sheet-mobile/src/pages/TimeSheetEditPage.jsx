import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Checkbox } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRoute } from "@react-navigation/native";
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import Header from "../components/Header";
import AdjustableModal from "../components/AdjustableModal";
import Input from "../components/Input";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import { useInput } from "../hooks/useInput";
import { addJourney } from "../services/WorkJourneyService";
import { timeValidations } from "../common/validations";
import CustomModal from "../components/CustomModal";
import RefreshContext from "../contexts/RefreshContext";
import { convertPartialTime } from "../common/utils";
import { updateJourney } from "../services/WorkJourneyService";

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

export default function TimeSheetEditPage({ navigation }) {

    const route = useRoute();
    const { userId, journeyData } = route.params;
    const { updateRefresh } = React.useContext(RefreshContext);

    const [calendarVisible, setCalendarVisible] = React.useState(false);
    const [calendarValue, setCalendarValue] = React.useState(new dayjs(journeyData.date));
    const [isMedicalCertificate, setIsMedicalCertificate] = React.useState(journeyData.journeyType);
    const [isWaitingResponse, setIsWaitingResponse] = React.useState(false);
    const [modalContent, setModalContent] = React.useState(null);
    const [modalVisible, setModalVisible] = React.useState(false);


    const dateInput = useInput(new dayjs(journeyData.date));
    const startTimeInput = useInput(journeyData.startTime);
    startTimeInput.setValidation(
        timeValidations.timeIsBlank,
        "O tempo de início da jornada não pode estar em branco."
    );
    startTimeInput.setValidation(
        timeValidations.timeIsOutsideTimeBounds,
        "O tempo de início da jornada precisa estar dentro do limite de 0h às 24h."
    );

    const startLunchTimeInput = useInput(journeyData.startLunchTime);
    startLunchTimeInput.setValidation(
        timeValidations.timeIsBlank,
        "O tempo de saída para almoço não pode estar em branco."
    );
    startLunchTimeInput.setValidation(
        timeValidations.timeIsOutsideTimeBounds,
        "O tempo de saída para almoço precisa estar dentro do limite de 0h às 24h."
    );

    const finishTimeInput = useInput(journeyData.endTime);
    finishTimeInput.setValidation(
        timeValidations.timeIsBlank,
        "O tempo final da jornada não pode estar em branco."
    );
    finishTimeInput.setValidation(
        timeValidations.timeIsOutsideTimeBounds,
        "O tempo final da jornada precisa estar dentro do limite de 0h às 24h."
    );

    const finishLunchTimeInput = useInput(journeyData.endLunchTime);
    finishLunchTimeInput.setValidation(
        timeValidations.timeIsBlank,
        "O tempo de retorno do almoço não pode estar em branco."
    );
    finishLunchTimeInput.setValidation(
        timeValidations.timeIsOutsideTimeBounds,
        "O tempo de retorno do almoço precisa estar dentro do limite de 0h às 24h."
    );
    finishLunchTimeInput.setValidation(
        (finishLunch) => finishLunch > startTimeInput.value ? 0 : 1,
        "O tempo de retorno não pode ser igual ou menos ao tempo de saída."
    );

    function updateCalendarDate(date) {

        dateInput.validate(date);

        setCalendarValue(date);
        setCalendarVisible(false);
    }

    function submitJourney() {

        setIsWaitingResponse(true);

        dateInput.validate(dateInput.value);
        startTimeInput.validate(startTimeInput.value);
        startLunchTimeInput.validate(startLunchTimeInput.value);
        finishTimeInput.validate(finishTimeInput.value);
        finishLunchTimeInput.validate(finishLunchTimeInput.value);

        if (!dateInput.value ||
            !startTimeInput.value ||
            !startLunchTimeInput.value ||
            !finishLunchTimeInput.value ||
            !finishTimeInput.value) {

            setIsWaitingResponse(false);

            return;
        }

        updateJourney(journeyData.id, dateInput.value,
            convertPartialTime(startTimeInput.value),
            convertPartialTime(finishTimeInput.value),
            convertPartialTime(startLunchTimeInput.value),
            convertPartialTime(finishLunchTimeInput.value), isMedicalCertificate)
            .then(result => {
                switch (result.status) {
                    case "WorkJourneyChanged":
                        setModalContent(<WorkJourneyChangedModalContent goBack={() => { updateRefresh(); navigation.pop(2); }} />);
                        setModalVisible(true);
                        break;
                    case "WorkJourneyAlreadyMarked":
                        setModalContent(<WorkJourneyAlreadyMarkedModalContent goBack={() => setModalVisible(false)} />)
                        setModalVisible(true);
                        break;
                    default:
                        setModalContent(<ServerErrorModalContent goBack={() => setModalVisible(false)} />)
                        setModalVisible(true);
                        break;
                }

                setIsWaitingResponse(false);
            })
    }

    React.useEffect(() => {
        startTimeInput.skipValidation(isMedicalCertificate);
        startLunchTimeInput.skipValidation(isMedicalCertificate);
        finishLunchTimeInput.skipValidation(isMedicalCertificate);
        finishTimeInput.skipValidation(isMedicalCertificate);

        console.log(isMedicalCertificate);
    }, [isMedicalCertificate])

    return (
        <View className="flex-1 bg-primary-600">

            <CustomModal visible={modalVisible}>{modalContent}</CustomModal>

            <Header></Header>

            {calendarVisible && (
                <View
                    className=" flex-1 justify-center items-center h-full w-full absolute p-10"
                    style={{ zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                    <View className="bg-white p-5 rounded-lg">
                        <DateTimePicker
                            mode="single"
                            date={calendarValue}
                            onChange={(params) => updateCalendarDate(params.date)}
                            selectedItemColor="#1E3F42"
                        />
                    </View>
                </View>
            )}

            <View className="flex w-full flex-row items-center bg-primary-800 border  border-y-white p-2 mt-2">
                <View className="flex justify-center items-center w-8 h-8 bg-primary-400 rounded">
                    <Text className="text-base font-bold text-white">Dia</Text>
                </View>
                <View className="flex-1 flex-row justify-around">
                    <Text className="text-base text-primary-100">início</Text>
                    <Text className="text-base text-primary-100">saída</Text>
                    <Text className="text-base text-primary-100">retorno</Text>
                    <Text className="text-base text-primary-100">final</Text>
                </View>
            </View>

            <View className="flex w-full flex-row items-center bg-primary-400 border border-primary-600 p-2">
                <View className="flex justify-center items-center w-8 h-8 bg-primary-600 rounded">
                    <Text className="text-base font-bold text-white">{dateInput.value?.date().toString().padStart(2, "0")}</Text>
                </View>
                <View className="flex-1 flex-row justify-around">
                    {isMedicalCertificate ? (
                        <Text className="text-base text-white">Atestado médico</Text>
                    ) : (
                        <>
                            <Text className="text-base text-white">{startTimeInput.value}</Text>
                            <Text className="text-base text-white">{startLunchTimeInput.value}</Text>
                            <Text className="text-base text-white">{finishLunchTimeInput.value}</Text>
                            <Text className="text-base text-white">{finishTimeInput.value}</Text>
                        </>
                    )}

                </View>
            </View>

            <View className="flex-1 w-full flex-col justify-end items-center mt-20">
                <AdjustableModal keyboardVerticalOffset={-200}>
                    <View className="flex w-full">
                        <Text className="text-2xl font-bold text-primary-800">
                            Registro de ponto
                        </Text>
                        <Text className="text-sm font-semibold mb-5">
                            Altere as informações do registro de ponto.
                        </Text>

                        <View className="flex mb-2">
                            <InputCalendar
                                label="Dia"
                                placeholder="Selecione o dia"
                                value={`${calendarValue.date()} de ${months[calendarValue.month()]}, ${calendarValue.year()}`}
                                onPress={() => setCalendarVisible(!calendarVisible)}
                            />
                            <ErrorMessage
                                show={dateInput.errorVisible}
                                message={dateInput.errorMessage}
                            />
                        </View>

                        <View className="flex mb-2">
                            <Input
                                label="Início da jornada"
                                placeholder="00:00"
                                keyboardType="numeric"
                                mask="99:99"
                                value={journeyData.startTime}
                                setInputValue={startTimeInput.validate}
                                disabled={isMedicalCertificate}
                            />
                            <ErrorMessage
                                show={startTimeInput.errorVisible}
                                message={startTimeInput.errorMessage}
                            />
                        </View>

                        <View className="flex mb-2">
                            <View className="flex flex-row">
                                <Input
                                    className="mr-1"
                                    label="Saída para almoço"
                                    placeholder="00:00"
                                    keyboardType="numeric"
                                    mask="99:99"
                                    value={journeyData.startLunchTime}
                                    setInputValue={startLunchTimeInput.validate}
                                    disabled={isMedicalCertificate}
                                />
                                <Input
                                    className="ml-1"
                                    label="Retorno do almoço"
                                    placeholder="00:00"
                                    keyboardType="numeric"
                                    mask="99:99"
                                    value={journeyData.endLunchTime}
                                    setInputValue={finishLunchTimeInput.validate}
                                    disabled={isMedicalCertificate}
                                />
                            </View>
                            <ErrorMessage
                                show={
                                    startLunchTimeInput.errorVisible ||
                                    finishLunchTimeInput.errorVisible
                                }
                                message={
                                    startLunchTimeInput.errorVisible
                                        ? startLunchTimeInput.errorMessage
                                        : finishLunchTimeInput.errorMessage
                                }
                            />
                        </View>

                        <View className="flex mb-2">
                            <Input
                                className="mr-1"
                                label="Final da jornada"
                                placeholder="00:00"
                                keyboardType="numeric"
                                mask="99:99"
                                value={journeyData.endTime}
                                setInputValue={finishTimeInput.validate}
                                disabled={isMedicalCertificate}
                            />

                            <ErrorMessage
                                show={finishTimeInput.errorVisible}
                                message={finishTimeInput.errorMessage}
                            />
                        </View>

                        <View className="flex flex-row items-center mb-2">
                            <Checkbox color="#1E3F42"
                                status={isMedicalCertificate ? "checked" : "unchecked"}
                                onPress={() => setIsMedicalCertificate(!isMedicalCertificate)} />
                            <Text className="text-sm font-bold">Atestado médico?</Text>
                        </View>

                        <Button title="Registrar Ponto" color="primary-600" onPress={submitJourney}
                            disabled={isWaitingResponse}
                            isRunning={isWaitingResponse} />
                        <Button
                            onPress={() => navigation.goBack()}
                            className="mt-2"
                            title="Voltar"
                            color="primary-600"
                            type="outline"
                            disabled={isWaitingResponse}
                        />
                    </View>
                </AdjustableModal>
            </View>
        </View>
    );
}

function InputCalendar({ label, placeholder, value, onPress }) {
    return (
        <View className="flex-1">
            <Text className="text-sm text-primary-600">{label}</Text>
            <View className="flex flex-row w-full border border-primary-600 rounded-lg pr-2 items-center">
                <TextInput
                    value={value}
                    className="flex-1 border-none pl-1.5 mr-2 h-9 text-black"
                    placeholder={placeholder}
                    editable={false}
                />
                <Pressable onPress={onPress}>
                    <Icon name="calendar-month" size={24} color="#1E3F42" />
                </Pressable>
            </View>
        </View>
    );
}

function WorkJourneyAlreadyMarkedModalContent({ goBack }) {
    return (
        <View className="flex flex-col">
            <Text className="text-xl font-bold text-danger-600 mb-1">
                Já existe um registro nessa data
            </Text>
            <Text className="text-sm font-semibold mb-5">
                Já existe um registro para essa data, selecione outra data.
            </Text>
            <Button
                title="Voltar"
                color="primary-600"
                type="outline"
                onPress={goBack}
            />
        </View>
    );
}

function WorkJourneyChangedModalContent({ goBack }) {
    return (
        <View className="flex flex-col">
            <Text className="text-2xl font-bold text-primary-800 mb-1">
                Ponto Alterado
            </Text>
            <Text className="text-sm font-semibold mb-5">
                Ponto alterado com sucesso, volte para a tela de folha de pontos para gerar um relatório.
            </Text>
            <Button
                title="Ok"
                color="primary-600"
                type="outline"
                onPress={goBack}
            />
        </View>
    );
}

function ServerErrorModalContent({ goBack }) {
    return (
        <View className="flex flex-col">
            <Text className="text-xl font-bold text-danger-600 mb-1">
                Erro ao se comunicar com o servidor
            </Text>
            <Text className="text-sm font-semibold mb-5">
                Verifique sua conexão com a internet e tente novamente.
            </Text>
            <Button
                className="mt-5"
                title="Ok"
                color="primary-600"
                type="outline"
                onPress={goBack}
            />
        </View>
    );
}
