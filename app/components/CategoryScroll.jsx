import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";

const CategoryScroll = ({ categories, selected, setSelected }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: 8,
        paddingHorizontal: 5,
        paddingVertical: 10,
      }}
    >
      {categories.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => setSelected(item)}>
          <View
            style={{
              backgroundColor: selected === item ? "#ffffff" : "#1c1c1e",
              paddingVertical: 6,
              paddingHorizontal: 16,
              borderRadius: 3,
            }}
          >
            <Text
              style={{
                color: selected === item ? "#000" : "#ffffff",
                fontWeight: "medium",
                fontSize: 18,
              }}
            >
              {item}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoryScroll;
