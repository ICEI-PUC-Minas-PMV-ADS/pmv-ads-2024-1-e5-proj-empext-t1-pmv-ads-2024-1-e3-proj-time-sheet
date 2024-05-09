import React, { useEffect } from "react";
import {
  View,
  Animated,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  ScrollView,
} from "react-native";

export default function AdjustableModal({
  keyboardVerticalOffset = 0,
  children,
}) {
  const effect = React.useRef(new Animated.Value(0)).current;
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);

  useEffect(() => {
    Animated.timing(effect, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [effect]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex flex-col justify-end h-screen w-full"
    >
      <Animated.View
        className="flex flex-col w-full bg-surface-600 rounded-t-3xl p-10 absolute"
        style={{
          transform: [
            {
              translateY: effect.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
          bottom: keyboardOpen ? keyboardVerticalOffset : 0,
        }}
      >
        {children}
      </Animated.View>
    </KeyboardAvoidingView>
  );
}
