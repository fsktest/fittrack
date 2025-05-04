import {
  View,
  Text,
  Alert,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { signOutUser } from "../../../api/appwrite.api";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Achievements");

  const tabs = [
    { name: "Achievements", icon: "military-tech" },
    { name: "Challenges", icon: "emoji-flags" },
  ];

  const achievements = [
    {
      title: "Completed 5 Challenges",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
      icon: "medal-outline",
    },
    {
      title: "Completed 5 Challenges",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
      icon: "medal-outline",
    },
    {
      title: "Completed 5 Challenges",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
      icon: "medal-outline",
    },
  ];


  const challenges = [
    {
      title: "7-Day Push-up Challenge",
      description: "Complete 100 push-ups every day for 7 days",
      participants: 54,
      daysLeft: 3,
      isParticipating: true,
    },
    {
      title: "Monthly Step Challenge",
      description: "Reach 300,000 steps this month",
      participants: 129,
      daysLeft: 12,
      isParticipating: false,
    },
    {
      title: "Healthy Eating Week",
      description: "Log all meals and stay under your calorie goal for 7 days",
      participants: 78,
      daysLeft: 5,
      isParticipating: true,
    },
  ];

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
  }, []);
  console.log("currentUser Name:", currentUser);

  // console.log("user:", user);
  const handleLogOut = async () => {
    try {
      const response = await signOutUser();
      Alert.alert("Success", "Logged out successfully");
      return true;
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="px-4 bg-bgPrimary">
      {/* Profile Image and some Icon  */}
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 80,
        }}
      >
        <View className="flex-row items-center justify-end">
          <TouchableOpacity
            onPress={handleLogOut}
            className="bg-btnPrimary p-2 rounded-md"
          >
            <Ionicons name="log-out-outline" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <View className="relative flex items-center justify-center mt-3">
          <Image
            source={{ uri: currentUser?.avatar }}
            className="size-24 rounded-full border-[3px] border-btnPrimary p-1"
          />
          <View className="bg-btnPrimary border border-black rounded-full font-pmedium absolute right-[40%] bottom-1 p-1">
            <TouchableOpacity>
              <Ionicons
                name="card-outline"
                size={16}
                className=""
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Names and goals  */}

        <Text className="text-white text-xl font-psemibold capitalize text-center mt-2">
          {currentUser?.name}
        </Text>
        <Text className="text-textSecondary text-lg  capitalize text-center mb-2">
          {currentUser?.goal}
        </Text>

        {/* User ID Copy */}
        <View className=" w-full rounded-sm flex flex-row justify-center items-center gap-2">
          <View className="bg-bgSecondary px-2 py-2  rounded-lg flex flex-row justify-center items-center gap-2">
            <Text className="text-textSecondary">
              User ID: {currentUser?.$id}
            </Text>
            <TouchableOpacity>
              <Ionicons name="copy-outline" size={18} color="#A4A4A4" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Friends, achievements, Day Streaks */}
        <View className="flex flex-row justify-between items-center my-4 ">
          <View className="flex items-center bg-bgSecondary px-2 py-4 w-[30%] rounded-md">
            <Text className="text-white text-xl font-psemibold">3</Text>
            <Text className="text-textSecondary">Friends</Text>
          </View>
          {/* sfdsf */}
          <View className="flex items-center bg-bgSecondary px-2 py-4 w-[30%] rounded-md">
            <Text className="text-white text-xl font-psemibold">3</Text>
            <Text className="text-textSecondary">Achievements</Text>
          </View>
          {/* sfdsf */}
          <View className="flex items-center bg-bgSecondary px-2 py-4 w-[30%] rounded-md">
            <Text className="text-white text-xl font-psemibold">4</Text>
            <Text className="text-textSecondary">Day Streak</Text>
          </View>
        </View>

        {/* Share and Copy BTN */}
        <View className="flex flex-row items-center justify-center w-full gap-4 my-2">
          <TouchableOpacity className="bg-bgSecondary flex flex-row items-center justify-center gap-1 px-4 py-4 rounded-md w-[48%]">
            <Ionicons name="share-social-outline" size={20} color="#A4A4A4" />
            <Text className="text-[#A4A4A4]">Share Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-btnPrimary flex flex-row items-center justify-center gap-1 px-4 py-4 rounded-md w-[48%]">
            <Ionicons name="qr-code-outline" size={20} color="#000" />
            <Text>QR Code</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Switches */}

        <View className="pt-2 border-b border-gray-800">
          <ScrollView
            horizontal
            contentContainerStyle={{ justifyContent: "space-between" }}
            showsHorizontalScrollIndicator={false}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name;
              return (
                <TouchableOpacity
                  key={tab.name}
                  onPress={() => setActiveTab(tab.name)}
                  className="flex-1 items-center justify-center px-4 py-2"
                >
                  <View className="flex items-center">
                    <View className="flex-row items-center">
                      <MaterialIcons
                        name={tab.icon}
                        size={20}
                        color={isActive ? "#A9FF00" : "#A4A4A4"}
                      />
                      <Text
                        className={`ml-2 text-sm ${
                          isActive ? "text-lime-400" : "text-[#A4A4A4]"
                        }`}
                      >
                        {tab.name}
                      </Text>
                    </View>

                    {/* Bottom Border for Active Tab */}
                    {isActive && (
                      <View className="h-1 w-8 bg-lime-400 rounded-full mt-1" />
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Tab Content */}

        {activeTab === "Achievements" && (
          <View className="flex flex-row flex-wrap justify-between gap-4 mt-4">
            {achievements.map((achievement, index) => (
              <View
                key={index}
                className="flex flex-col items-center w-[40%] px-2"
              >
                <View className="w-20 h-20 bg-lime-400 rounded-full flex items-center justify-center">
                  <MaterialIcons name="military-tech" size={26} color="#fff" />
                </View>
                <Text className="text-white text-center text-lg font-medium my-1">
                  {achievement.title}
                </Text>
                <Text
                  className="text-gray-400 text-center text-sm"
                  numberOfLines={2}
                >
                  {achievement.description}
                </Text>
              </View>
            ))}
          </View>
        )}
        {activeTab === "Challenges" && (
          <View className="w-full mt-4">
            {challenges.map((challenge, index) => (
              <View
                key={index}
                className="bg-[#1a1a1a] p-4 rounded-lg mb-4 shadow-md border border-gray-700"
              >
                {/* Title and Info */}
                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-white font-semibold text-lg w-2/3">
                    {challenge.title}
                  </Text>
                  <View className="flex-row items-center gap-1">
                    <View className="flex-row items-center space-x-1">
                      <MaterialIcons
                        name="people-outline"
                        size={16}
                        color="#A4A4A4"
                      />
                      <Text className="text-gray-400 text-xs">
                        {challenge.participants}
                      </Text>
                    </View>
                    <View className="flex-row items-center space-x-1">
                      <MaterialIcons
                        name="calendar-today"
                        size={16}
                        color="#A4A4A4"
                      />
                      <Text className="text-gray-400 text-xs">
                        {challenge.daysLeft} days
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Description */}
                <Text className="text-gray-400 text-sm mb-4">
                  {challenge.description}
                </Text>

                {/* Buttons */}
                <View className="flex-row justify-between">
                  <TouchableOpacity className="bg-bgSecondary border border-gray-500 px-4 py-2 rounded-sm">
                    <Text className="text-white font-semibold text-sm">
                      View Details
                    </Text>
                  </TouchableOpacity>

                  {challenge.isParticipating ? (
                    <TouchableOpacity className="border border-lime-400 px-4 py-2 rounded-sm">
                      <Text className="text-lime-400 font-semibold text-sm">
                        Participating
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity className="bg-lime-400 px-4 py-2 rounded-sm">
                      <Text className="text-black font-semibold text-sm">
                        Join Challenge
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
