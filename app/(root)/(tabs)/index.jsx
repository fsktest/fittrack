import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GradientBox from "../../components/GradientBox";
import GradientBorderBox from "../../components/GradientBox";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentUser, setCurrentUser] = useState(null);

  // Fitness tips data
  const fitnessTips = [
    {
      icon: "water-outline",
      tip: "Try drinking water 30 minutes before your workout for better hydration.",
      color: "#9BEC00",
    },
    {
      icon: "moon-outline",
      tip: "Get 7-9 hours of sleep for optimal muscle recovery and performance.",
      color: "#6366F1",
    },
    {
      icon: "nutrition-outline",
      tip: "Eat protein within 30 minutes after your workout for muscle repair.",
      color: "#F59E0B",
    },
  ];

  // Quick actions for fitness
  const quickActions = [
    {
      icon: "barbell-outline",
      label: "Start Workout",
      color: "#9BEC00",
      route: "/exercise",
    },
    {
      icon: "timer-outline",
      label: "Quick Timer",
      color: "#EF4444",
      route: null,
    },
    {
      icon: "analytics-outline",
      label: "Progress",
      color: "#8B5CF6",
      route: "/profile",
    },
    {
      icon: "calendar-outline",
      label: "Schedule",
      color: "#06B6D4",
      route: null,
    },
  ];

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await SecureStore.getItemAsync("currentUser");
        setCurrentUser(JSON.parse(userData));
      } catch (error) {
        console.error(error);
      }
    };
    getUser();

    // Auto-rotate fitness tips every 5 seconds
    const tipInterval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % fitnessTips.length);
    }, 5000);

    return () => clearInterval(tipInterval);
  }, []);

  const handleQuickAction = (route) => {
    if (route) {
      router.push(route);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-bgPrimary">
      {/* <View className="h-[60px] bg-bgSecondary flex items-center justify-center">
        <Text className="text-textPrimary text-center text-2xl">Dashboard</Text>
      </View> */}
      <ScrollView
        className="flex-1 px-4 mt-3"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-textPrimary text-xl">
          Welcome Back, {currentUser?.name || "Fitness Warrior"} 👋
        </Text>
        <Text className="text-textSecondary text-sm mt-1">
          Ready to crush your fitness goals today?
        </Text>

        <View className="flex mt-4">
          <Text className="text-textSecondary text-lg">Today's Progress</Text>

          <View className="flex-row items-center justify-center gap-5 mt-4">
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
          </View>

          <View className="flex-row items-center justify-center gap-5 mt-5">
            <TouchableOpacity className="w-[48%]">
              <View className="w-full h-[100px] bg-bgSecondary rounded-2xl flex-row items-center gap-4 p-4 shadow-lg">
                <Ionicons name="time-outline" size={28} color="#6366F1" />
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
                <Ionicons
                  name="calendar-clear-outline"
                  size={28}
                  color="#EF4444"
                />
                <View className="flex ">
                  <Text className="text-textPrimary text-3xl font-semibold">
                    4 days
                  </Text>
                  <Text className="text-textSecondary text-lg">Streak</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Weekly Goal Progress */}
        <View className="mt-6">
          <Text className="text-textSecondary text-lg mb-3">
            Weekly Goal Progress
          </Text>
          <View className="bg-bgSecondary rounded-2xl p-4">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-textPrimary text-lg font-semibold">
                Workout Goals
              </Text>
              <Text className="text-[#9BEC00] text-sm font-semibold">
                4/5 completed
              </Text>
            </View>
            <View className="bg-[#1a1a1a] h-3 rounded-full overflow-hidden">
              <View className="bg-[#9BEC00] h-full w-[80%] rounded-full" />
            </View>
            <Text className="text-textSecondary text-sm mt-2">
              1 more workout to reach your weekly goal!
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mt-6">
          <Text className="text-textSecondary text-lg mb-3">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between gap-3">
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleQuickAction(action.route)}
                className="w-[48%] bg-bgSecondary rounded-2xl p-4 flex-row items-center gap-3"
              >
                <View
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${action.color}20` }}
                >
                  <Ionicons name={action.icon} size={20} color={action.color} />
                </View>
                <Text className="text-textPrimary font-medium">
                  {action.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Current Challenge */}
        <View className="mt-6">
          <Text className="text-textSecondary text-lg mb-3">
            Active Challenge
          </Text>
          <View className="bg-gradient-to-r from-purple-600 to-pink-600 bg-bgSecondary rounded-2xl p-4 border border-[#9BEC00]/20">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-textPrimary text-lg font-semibold">
                30-Day Push-up Challenge
              </Text>
              <View className="bg-[#9BEC00] px-3 py-1 rounded-full">
                <Text className="text-black text-xs font-semibold">Day 12</Text>
              </View>
            </View>
            <Text className="text-textSecondary mb-3">
              Complete 40 push-ups today
            </Text>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <Ionicons name="people-outline" size={16} color="#A4A4A4" />
                <Text className="text-textSecondary text-sm">
                  127 participants
                </Text>
              </View>
              <TouchableOpacity className="bg-[#9BEC00] px-4 py-2 rounded-lg">
                <Text className="text-black font-semibold text-sm">
                  Mark Complete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Fitness Tip with Auto-rotation */}
        <View className="mt-6 mb-6">
          <Text className="text-textSecondary text-lg mb-3">
            💡 Fitness Tip
          </Text>
          <View
            className="h-20 w-full rounded-2xl shadow-lg flex-row items-center gap-4 p-4"
            style={{
              backgroundColor: `${fitnessTips[currentTipIndex].color}10`,
            }}
          >
            <View
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                backgroundColor: `${fitnessTips[currentTipIndex].color}30`,
              }}
            >
              <Ionicons
                name={fitnessTips[currentTipIndex].icon}
                size={30}
                color={fitnessTips[currentTipIndex].color}
              />
            </View>
            <Text className="text-textSecondary w-[80%] leading-5">
              {fitnessTips[currentTipIndex].tip}
            </Text>
          </View>

          {/* Tip indicators */}
          <View className="flex-row justify-center mt-3 gap-2">
            {fitnessTips.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentTipIndex ? "bg-[#9BEC00]" : "bg-gray-600"
                }`}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
