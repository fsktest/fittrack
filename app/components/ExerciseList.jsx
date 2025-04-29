import React from "react";
import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import ImageCarousel from "./ImageCarousel"; // ✅ import your carousel component
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const ExerciseList = ({ exercise, refreshing, handleRefresh }) => {
  if (!exercise || exercise.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <View className="flex-row items-center space-x-3">
          <Text className="text-textPrimary text-xl text-center">
            Loading Exercises
          </Text>
          <ActivityIndicator size={30} color="#9BEC00" />
        </View>
      </View>
    );
  }

  const handleExercisePress = (item) => {
    router.push(`/exercise/${item.$id}`);
  };

  return (
    <FlatList
      data={exercise}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleExercisePress(item)}
          className="bg-bgSecondary rounded-2xl h-[340px] shadow-lg mb-4 overflow-hidden"
        >
          {/* ✅ Use the Carousel component */}
          {item.imageUrls && item.imageUrls.length > 0 && (
            <ImageCarousel imageUrls={item.imageUrls} />
          )}

          <View className="bg-bgSecondary p-4">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-white text-2xl font-semibold max-w-[80%]">
                {item.name}
              </Text>
              <View className="flex-row items-center gap-2">
                <Ionicons size={24} name="heart-outline" color="#ffffff" />
                <Text className="text-white text-lg">10K</Text>
              </View>
            </View>

            <View className="flex-row flex-wrap gap-4 mt-2 justify-between">
              <View className="flex-row items-center gap-2 w-[48%]">
                <Ionicons size={24} name="infinite-outline" color="#A4A4A4" />
                <Text className="text-textSecondary text-xl capitalize">
                  {item.force}
                </Text>
              </View>
              <View className="flex-row items-center gap-2 w-[48%]">
                <Ionicons
                  size={24}
                  name="speedometer-outline"
                  color="#A4A4A4"
                />
                <Text className="text-textSecondary text-xl capitalize">
                  {item.level}
                </Text>
              </View>
            </View>

            <View className="flex-row flex-wrap gap-4 mt-3 justify-between">
              <View className="flex-row items-center gap-2 w-[48%]">
                <Ionicons size={24} name="settings-outline" color="#A4A4A4" />
                <Text className="text-textSecondary text-xl capitalize">
                  {item.equipment}
                </Text>
              </View>
              <View className="flex-row items-center gap-2 w-[48%]">
                <Ionicons size={22} name="body-outline" color="#A4A4A4" />
                <Text
                  className="text-textSecondary text-xl capitalize"
                  numberOfLines={1}
                >
                  {item.primary_muscles}{" "}
                  {item.secondary_muscles && `& ${item.secondary_muscles}`}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.$id}
      contentContainerStyle={{ gap: 5 }}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
  );
};

export default ExerciseList;
