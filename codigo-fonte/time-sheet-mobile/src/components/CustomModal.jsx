import React from "react";
import { View } from "react-native";
import Modal from "react-native-modal";

export default function CustomModal({ visible, children, ...rest }) {
  return (
    <Modal isVisible={visible}>
      <View className="flex-1 justify-center items-center">
        <View {...rest} className="flex flex-col w-full p-5 bg-surface-600 rounded-2xl">
          {children}
        </View>
      </View>
    </Modal>
  );
}
