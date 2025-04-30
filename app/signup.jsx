import { View, Text, SafeAreaView, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import FormField from "./components/FormField";
import CustomButton from "./components/CustomButton";
import icon from "../constants/icon";
import { Link } from "expo-router";
import { createUserAccount } from "../api/appwrite.api";

const Signup = () => {
  const goals = ["lose_weight", "gain_weight", "maintain_weight"];
  const genders = ["Male", "Female", "Other"];

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "Male",
    height_cm: "",
    weight_kg: "",
    goal: "lose_weight",
  });

  const handleSignUp = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.age ||
      !form.gender ||
      !form.height_cm ||
      !form.weight_kg ||
      !form.goal
    )
      return Alert.alert("Error in Sign UP", "Please fill all the fields");
    try {
      const response = await createUserAccount(
        form.name,
        form.email,
        form.password,
        parseInt(form.age, 10), // Convert to integer
        form.gender,
        parseFloat(form.height_cm), // Optional: convert to float if needed
        parseFloat(form.weight_kg), // Optional: convert to float if needed
        form.goal
      );
      return response;
    } catch (error) {
      Alert.alert("Error in Sign UP", error.message);
      console.log("Error in Sign UP: ", error);
    }
  };

  const renderStepFields = () => {
    switch (step) {
      case 1:
        return (
          <>
            <FormField
              label="Name"
              placeholder="Enter your name"
              labelStyle="text-white"
              inputStyle="text-white placeholder:text-gray-500"
              icon={icon.Person}
              value={form.name}
              onChangeText={(value) => setForm({ ...form, name: value })}
            />
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
              secureTextEntry={true}
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />
          </>
        );
      case 2:
        return (
          <>
            <FormField
              label="Age"
              placeholder="Enter your age"
              name="age"
              labelStyle="text-white"
              inputStyle="text-white placeholder:text-gray-500"
              value={form.age}
              onChangeText={(value) => setForm({ ...form, age: value })}
            />
            <FormField
              label="Gender"
              placeholder="Select your gender"
              name="gender"
              selectOptions={genders}
              labelStyle="text-white"
              inputStyle="text-white placeholder:text-gray-500"
              value={form.gender}
              onSelect={(value) => setForm({ ...form, gender: value })}
            />
            <FormField
              label="Height (cm)"
              placeholder="Enter your height"
              name="height_cm"
              labelStyle="text-white"
              inputStyle="text-white placeholder:text-gray-500"
              value={form.height_cm}
              onChangeText={(value) => setForm({ ...form, height_cm: value })}
            />
            <FormField
              label="Weight (kg)"
              placeholder="Enter your weight"
              name="weight_kg"
              labelStyle="text-white"
              inputStyle="text-white placeholder:text-gray-500"
              value={form.weight_kg}
              onChangeText={(value) => setForm({ ...form, weight_kg: value })}
            />
          </>
        );
      case 3:
        return (
          <>
            <FormField
              label="Goal"
              placeholder="Select your goal"
              name="goal"
              selectOptions={goals}
              labelStyle="text-white"
              inputStyle="text-white placeholder:text-gray-500"
              value={form.goal}
              onSelect={(value) => setForm({ ...form, goal: value })}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 px-4 py-4 bg-black">
      <ScrollView className="flex-1 mt-20">
        <View className="flex items-center justify-center">
          <View className="mb-6">
            <Text className="text-white text-2xl font-medium text-center">
              Register Your Account
            </Text>
            <Text className="text-btnPrimary text-xl text-center ">
              Fit Track
            </Text>
          </View>

          {renderStepFields()}

          {/* Navigation Buttons */}
          <View className="flex-row justify-between w-full mt-6 gap-2">
            <View className="flex-row justify-between w-full mt-6 gap-2">
              {step === 1 && (
                <CustomButton
                  title="Next"
                  handlepress={() => setStep(step + 1)}
                  containerStyle="w-full bg-[#363636] "
                />
              )}

              {step === 2 && (
                <View className="w-full gap-4">
                  <CustomButton
                    title="Back"
                    handlepress={() => setStep(step - 1)}
                    containerStyle="w-[48%] bg-[#363636]"
                  />
                  <CustomButton
                    title="Next"
                    handlepress={() => setStep(step + 1)}
                    containerStyle="w-[48%] bg-[#363636]"
                  />
                </View>
              )}

              {step === 3 && (
                <View className="w-full gap-4">
                  <CustomButton
                    title="Back"
                    handlepress={() => setStep(step - 1)}
                    containerStyle="w-[48%] bg-[#363636]"
                  />
                  <CustomButton
                    title="Sign Up"
                    handlepress={handleSignUp}
                    containerStyle="w-[48%]"
                  />
                </View>
              )}
            </View>
          </View>

          {/* Footer */}
          <View className="mt-10 flex-row items-center justify-center">
            <Text className="text-gray-500 text-lg">
              Already Have an Account{" "}
            </Text>
            <Link href="/signin" className="text-btnPrimary text-lg">
              SIGN IN
            </Link>
          </View>
        </View>
        <Text className="text-gray-300 text-lg text-center mt-10">
          Fit Track
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
