import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Input({
  value,
  label,
  placeholder,
  keyboardType,
  mask = null,
  setInputValue,
  secure,
  ...rest
}) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <View {...rest} className="flex w-full">
      <Text className="text-sm text-primary-600">{label}</Text>
      {mask ? (
        <MaskedTextInput
          className="w-full border border-primary-600 rounded-lg pl-1.5 h-9"
          value={value}
          onChangeText={(text, rawText) => {
            setInputValue(text);
          }}
          keyboardType={keyboardType}
          placeholder={placeholder}
          mask={mask}
        />
      ) : secure ? (
        <View className="flex flex-row w-full border border-primary-600 rounded-lg pr-2 items-center">
          <TextInput
            value={value}
            className="flex-1 border-none pl-1.5 mr-2 h-9"
            placeholder={placeholder}
            onChangeText={(text) => {
              setInputValue(text);
            }}
            secureTextEntry={!isVisible}
          />
          <Pressable onPress={() => setIsVisible(!isVisible)}>
            <Icon
              name={!isVisible ? "visibility" : "visibility-off"}
              size={24}
            />
          </Pressable>
        </View>
      ) : (
        <TextInput
          value={value}
          className="w-full border border-primary-600 rounded-lg pl-1.5 h-9"
          placeholder={placeholder}
          keyboardType={keyboardType}
          onChangeText={(text) => {
            setInputValue(text);
          }}
        />
      )}
    </View>
  );
}
