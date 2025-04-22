import { View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const TabIcon = ({ focused, IconComponent, iconName }) => (
  <View
    style={{
      backgroundColor: focused ? "#434343" : "transparent",
      borderRadius: 5,
      width: 60,
      height: 44,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <IconComponent name={iconName} size={24} color={`${focused ? "#A4A4A4" : "#FFFFFF"}`} />
  </View>
);

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1D1D1D",
          height: 70,
          position: "absolute",
          shadowColor: "#000",
          shadowOpacity: 0.3,
          shadowRadius: 8,
        },
        tabBarItemStyle: {
          height: "100%",
          top: 10,
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              IconComponent={Ionicons}
              iconName="home-outline"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              IconComponent={MaterialIcons}
              iconName="dashboard"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="exercise"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              IconComponent={MaterialIcons}
              iconName="fitness-center"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              IconComponent={Ionicons}
              iconName="person-circle-outline"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
