import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBox from "../../components/GradientBox";
import GradientBorderBox from "../../components/GradientBox";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-bgPrimary">
      {/* <View className="h-[60px] bg-bgSecondary flex items-center justify-center">
        <Text className="text-textPrimary text-center text-2xl">Dashboard</Text>
      </View> */}
      <ScrollView className="flex-1 px-4 mt-3">
        <Text className="text-textPrimary text-3xl">Welcome Back, Fsk 👋</Text>
        <View className="flex mt-4">
          <Text className="text-textSecondary text-2xl mt-4">
            Daily Summaries
          </Text>

          <View className="flex-row items-center justify-center gap-5 mt-4">
            <GradientBorderBox containerStyle="shadow-lg" />
            <GradientBorderBox containerStyle="shadow-lg" />
          </View>
          <View className="flex-row items-center justify-center gap-5 mt-5">
            <GradientBorderBox containerStyle="shadow-lg" />
            <GradientBorderBox containerStyle="shadow-lg" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
