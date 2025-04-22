import { View, Text, Alert, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { signOutUser } from "../../../api/appwrite.api";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";

const profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await SecureStore.getItemAsync("currentUser");
        setCurrentUser(userData);
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
    <SafeAreaView className="flex-1 items-center justify-center px-4 bg-white">
      <View className="w-full">
        <View className="w-20 h-20 rounded-full mb-4 bg-gray-300 items-center justify-center">
          <Text className="text-black text-3xl uppercase">
            {user?.name?.charAt(0)}
          </Text>
          <Text className="text-red-500 text-3xl uppercase">
            {currentUser?.name}
          </Text>
        </View>
        <View></View>
        <Text className="text-black">Profile Screen</Text>
        <CustomButton title="Logout" handlepress={handleLogOut} />
      </View>
    </SafeAreaView>
  );
};

export default profile;
