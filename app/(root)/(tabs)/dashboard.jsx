import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const dashboard = () => {
  return (
    <SafeAreaView className="flex-1 bg-bgPrimary">
      {/* <View className="h-[60px] bg-bgSecondary flex items-center justify-center">
            <Text className="text-textPrimary text-center text-2xl">Dashboard</Text>
          </View> */}
      <ScrollView className="flex-1 px-4 mt-3">
        <Text className="text-textPrimary text-2xl">Welcome Back, Fsk 👋</Text>
        <View className="flex mt-2">
          <Text className="text-textSecondary text-lg">Today's Progress</Text>

          <View className="flex-row items-center justify-center gap-5 mt-4">
            {/* <GradientBorderBox containerStyle="shadow-lg" /> */}
            <TouchableOpacity className="w-[48%]">
              <View className="w-full h-[100px] bg-bgSecondary rounded-2xl flex-row items-center gap-4 p-4 shadow-lg">
                <Ionicons name="footsteps-outline" size={28} color="#9BEC00" />
                <View className="flex ">
                  <Text className="text-textPrimary text-3xl font-semibold">
                    8,456
                  </Text>
                  <Text className="text-textSecondary text-lg">Steps</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%]">
              <View className="w-full h-[100px] bg-bgSecondary rounded-2xl flex-row items-center gap-4 p-4 shadow-lg">
                <Ionicons name="flame-outline" size={28} color="orange" />
                <View className="flex ">
                  <Text className="text-textPrimary text-3xl font-semibold">
                    456
                  </Text>
                  <Text className="text-textSecondary text-lg">Calories</Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* <GradientBorderBox containerStyle="shadow-lg" /> */}
          </View>
          <View className="flex-row items-center justify-center gap-5 mt-5">
            {/* <GradientBorderBox containerStyle="shadow-lg" /> */}

            <TouchableOpacity className="w-[48%]">
              <View className="w-full h-[100px] bg-bgSecondary rounded-2xl flex-row items-center gap-4 p-4 shadow-lg">
                <Ionicons name="time-outline" size={28} color="blue" />
                <View className="flex ">
                  <Text className="text-textPrimary text-3xl font-semibold">
                    45 min
                  </Text>
                  <Text className="text-textSecondary text-lg">Workout</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="w-[48%]">
              <View className="w-full h-[100px] bg-bgSecondary rounded-2xl flex-row items-center gap-4 p-4 shadow-lg">
                <Ionicons name="calendar-clear-outline" size={28} color="red" />
                <View className="flex ">
                  <Text className="text-textPrimary text-3xl font-semibold">
                    4 days
                  </Text>
                  <Text className="text-textSecondary text-lg">Streak</Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* <GradientBorderBox containerStyle="shadow-lg" /> */}
          </View>
        </View>

        {/* EE69B2 */}
        <View className="bg-[#9BEC00]/10  h-20 w-full mt-3 rounded-md shadow-white shadow-lg flex-row items-center gap-4 p-4">
          <View className="w-16 h-16 rounded-md bg-[#9BEC00]/30   flex items-center justify-center">
            <Ionicons name="water-outline" size={30} color="#9BEC00" />
          </View>
          <Text className="text-textSecondary w-[80%]">
            Try Drinking water 30 minutes before your workout for better
            hydration.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default dashboard;
