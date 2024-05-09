import React from "react";
import { TouchableOpacity } from "react-native";

export default function Fab({ children, onPress, position, ...rest }) {
  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      className="p-3 rounded-full bg-primary-400 shadow border border-primary-600"
      activeOpacity={0.8}
      style={
        position
          ? {
              position: "absolute",
              left: position.left,
              top: position.top,
              right: position.right,
              bottom: position.bottom,
            }
          : {
              position: "absolute",
              right: 20,
              bottom: 20,
            }
      }
    >
      {children}
    </TouchableOpacity>
  );
}
