import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styled } from "nativewind";
import { Icon } from "react-native-paper";

export default function Button({ title, color, type, onPress, icon, ...rest }) {
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.8}
      className={`flex flex-row justify-center items-center p-3 w-full hover:bg-primary-100 ${
        type == "outline" ? `border border-${color}` : `bg-${color}`
      } rounded-xl`}
      onPress={onPress}
    >
      {icon}
      <Text
        className={`text-base font-bold ${
          type == "outline" ? `text-${color}` : `text-white`
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
