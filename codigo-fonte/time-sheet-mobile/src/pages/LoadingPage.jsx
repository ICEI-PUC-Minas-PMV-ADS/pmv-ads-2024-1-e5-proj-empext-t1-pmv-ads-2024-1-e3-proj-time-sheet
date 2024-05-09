import React from "react";
import { View, ActivityIndicator } from "react-native";

export default function LoadingPage() {
  return (
    <View className="flex-1 justify-center items-center bg-primary-600">
      <ActivityIndicator size={64} color="#9ABEA4" />
    </View>
  );
}
