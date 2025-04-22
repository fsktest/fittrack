import { View, Text, SafeAreaView, Image, Alert } from "react-native";
import React, { useState } from "react";
import FormField from "./components/FormField";
import icon from "../constants/icon";
import CustomButton from "./components/CustomButton";
import image from "../constants/image";
import { Link } from "expo-router";
import { signInUser } from "../api/appwrite.api";

const signin = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const response = await signInUser(form.email, form.password);
      Alert.alert("Success", "Logged in successfully");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
    }
  };
  return (
    <SafeAreaView className="flex-1 px-4  py-4 justify-between bg-black">
      <View></View>
      <View className="flex items-center justify-center">
        <Text className="text-white text-3xl font-semibold">
          Welcome Back 👋
        </Text>
        <FormField
          label="Email"
          placeholder="Enter your email"
          labelStyle="text-white"
          inputStyle="text-white placeholder:text-gray-500"
          icon={icon.Person}
          value={form.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
        />
        <FormField
          label="Password"
          placeholder="Enter your password"
          name="password"
          labelStyle="text-white"
          inputStyle="text-white placeholder:text-gray-500"
          icon={icon.Key}
          value={form.password}
          secureTextEntry={true}
          onChangeText={(value) => setForm({ ...form, password: value })}
        />
        <CustomButton
          title="Sign In"
          handlepress={handleSignIn}
          containerStyle="mt-6 w-full"
        />

        <View className="mt-10 flex-row items-center justify-center">
          <Text className="text-gray-500 text-lg">Don't Have an Account </Text>
          <Link href="/signup" className="text-red-500 text-lg">
            SIGN UP
          </Link>
        </View>
      </View>

      <Text className="text-gray-300 text-lg text-center">Fit Track</Text>
    </SafeAreaView>
  );
};

export default signin;
