import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import icon from "../../constants/icon";
import { Link } from "expo-router";

const Signup = () => {
  const goals = ["lose_weight", "gain_weight", "maintain_weight"];
  const genders = ["male", "female", "Other"];

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "male",
    height_cm: "",
    weight_kg: "",
    goal: "lose_weight",
  });

  const handleSignUp = async () => {
    // Final submission logic here
    console.log("Form submitted:", form);
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
              value={form.age.toString()}
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
              value={form.height_cm.toString()}
              onChangeText={(value) => setForm({ ...form, height_cm: value })}
            />
            <FormField
              label="Weight (kg)"
              placeholder="Enter your weight"
              name="weight_kg"
              labelStyle="text-white"
              inputStyle="text-white placeholder:text-gray-500"
              value={form.weight_kg.toString()}
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
            <Text className="text-white text-3xl font-psemibold text-center">
              Register Your Account
            </Text>
            <Text className="text-red-500 text-2xl text-center font-pmedium">
              Fit Track
            </Text>
          </View>

          {renderStepFields()}

          {/* Navigation Buttons */}
          <View className="flex-row justify-between w-full mt-6 gap-2">
            {step > 1 && (
              <CustomButton
                title="Back"
                handlepress={() => setStep(step - 1)}
                containerStyle="w-[48%] bg-gray-700"
              />
            )}
            {step < 3 ? (
              <CustomButton
                title="Next"
                handlepress={() => setStep(step + 1)}
                containerStyle={
                  step === 1
                    ? "w-full bg-gray-700 border"
                    : "w-[48%] bg-gray-700"
                }
              />
            ) : (
              <CustomButton
                title="Sign Up"
                handlepress={handleSignUp}
                containerStyle="w-[48%] "
              />
            )}
          </View>

          {/* Footer */}
          <View className="mt-10 flex-row items-center justify-center">
            <Text className="text-gray-500 text-lg">
              Already Have an Account{" "}
            </Text>
            <Link href="/signin" className="text-red-500 text-lg">
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
