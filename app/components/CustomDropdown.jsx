import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";

const CustomDropdown = ({
  data = [],
  onSelect,
  value = null,
  placeholder = "Select an item",
  containerStyle = "",
  imageIcon = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
    onSelect(item); // Pass selected item to parent
  };

  useEffect(() => {
    const matchingItem = data.find((item) => item.value === value);
    setSelectedItem(matchingItem || null);
  }, [value, data]);

  return (
    <View className={`w-fit relative`}>
      {/* Dropdown Header */}
      <TouchableOpacity
        className={`${containerStyle} bg-white h-[35px] text-black px-3 rounded-lg flex flex-row gap-2 items-center justify-center`}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text className={`text-black text-lg font-pmedium `}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        {imageIcon && (
          <Image source={imageIcon} className="w-4 h-4" resizeMode="contain" />
        )}
      </TouchableOpacity>

      {/* Dropdown List */}
      {isOpen && (
        <View
          style={{ zIndex: 100, elevation: 5 }}
          className="absolute top-12 right-0 w-[100px] bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <FlatList
            data={data}
            scrollEnabled={false}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="px-4 py-2 border-b border-gray-200"
                onPress={() => handleSelect(item)}
              >
                <Text className="text-gray-700">{item.label}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          />
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;
