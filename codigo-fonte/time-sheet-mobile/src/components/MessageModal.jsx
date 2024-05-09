import React from "react";
import { Animated, View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function MessageModal({ title, message, iconName }) {
  const effect = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(effect, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [effect]);

  return (
    <Animated.View
      className="flex w-full"
      style={{
        position: "absolute",
        bottom: 0,
        transform: [
          {
            translateY: effect.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0],
            }),
          },
        ],
      }}
    >
      <View className="flex p-5 bg-white m-5 rounded">
        <View className="flex flex-row items-center">
          {iconName && (
            <Icon
              name={iconName}
              size={24}
              color="#1E3F42"
              style={{ marginRight: 3 }}
            />
          )}
          <Text className="text-xl font-bold text-primary-800 mb-1">
            {title}
          </Text>
        </View>
        <Text className="text-sm font-semibold">{message}</Text>
      </View>
    </Animated.View>
  );
}
