import { View, Text } from "react-native";
import Button from "./Button";
import Divider from "./Divider";

export function AlertModalContent({ goBack, title, message }) {
    return (
        <View className="flex flex-col">
            <Text className="text-xl font-bold text-danger-600 mb-1">
                {title}
            </Text>
            <Text className="text-sm font-semibold mb-5">
                {message}
            </Text>
            <Divider />
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

export function InfoModalContent({ goBack, title, message }) {
    return (
        <View className="flex flex-col">
            <Text className="text-xl font-bold text-primary-800 mb-1">
                {title}
            </Text>
            <Text className="text-sm font-semibold mb-5">
                {message}
            </Text>
            <Divider />
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
