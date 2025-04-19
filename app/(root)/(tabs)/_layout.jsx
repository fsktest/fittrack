import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="dashboard"
        options={{
          headerTitleAlign: "center",
          headerShown: false,
          title: "Dash",
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
