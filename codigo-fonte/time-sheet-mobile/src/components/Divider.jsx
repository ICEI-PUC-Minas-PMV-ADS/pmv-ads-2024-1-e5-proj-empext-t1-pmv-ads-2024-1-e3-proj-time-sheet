import React from "react";
import { View } from "react-native";

export default function Divider({ ...rest }) {
  return <View {...rest} className="flex mx-2 h-px bg-text-400"></View>;
}
