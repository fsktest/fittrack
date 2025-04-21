import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const exercise = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center px-4 bg-white">
      <Text className="text-black">Exercise Screen</Text>
    </SafeAreaView>
  );
};

export default exercise;
