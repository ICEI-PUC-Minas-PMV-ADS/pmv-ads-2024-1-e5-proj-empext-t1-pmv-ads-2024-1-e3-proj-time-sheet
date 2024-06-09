import React from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";

export default function Fab({
  children,
  onPress,
  position,
  isLoading = false,
  ...rest
}) {
  return (
    <TouchableOpacity
      {...rest}
      onPress={onPress}
      className="p-3 rounded-full bg-primary-400 shadow border border-primary-600"
      activeOpacity={0.8}
      disabled={isLoading}
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
      {isLoading ? (
        <ActivityIndicator color="#FFF" size="small" />
      ) : (
        children 
      )}
    </TouchableOpacity>
  );
}
