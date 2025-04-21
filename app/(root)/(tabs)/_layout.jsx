import { View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const TabIcon = ({ focused, IconComponent, iconName }) => (
  <View
    style={{
      backgroundColor: focused ? "red" : "transparent",
      borderRadius: 50,
      width: 60,
      height: 44,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <IconComponent name={iconName} size={24} color={`${focused ? "#fff" : "#c3c6c9"}`} />
  </View>
);

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#000",
          borderRadius: 100,
          height: 60,
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          paddingHorizontal: 10,
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
