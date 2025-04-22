import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import icons from "../../constants/icon";

const FormField = ({
  label,
  name,
  labelStyle,
  icon,
  secureTextEntry = false,
  placeholder,
  containerStyle,
  inputStyle,
  iconStyle,
  selectOptions = null, // <-- New prop
  onSelect, // callback when option selected
  value,
  onChangeText, // <-- Make sure to receive this prop
  className,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);

  const handleSelect = (item) => {
    setShowSelectModal(false);
    onSelect?.(item); // This triggers the callback passed from parent
  };

  const isSelect = Array.isArray(selectOptions);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ width: "100%" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          {label && (
            <Text className={`text-lg font-JakartaBold mb-3 ${labelStyle}`}>
              {label}
            </Text>
          )}

          <View
            className={`flex w-full flex-row justify-start pr-3 items-center relative bg-gray-900 rounded-lg border border-neutral-100 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-7 h-7 ml-4 ${iconStyle}`} />
            )}

            {isSelect ? (
              <TouchableOpacity
                className={`p-4 flex-1 flex-row justify-between items-center ${inputStyle}`}
                onPress={() => setShowSelectModal(true)}
              >
                <Text className="text-white text-[18px]">
                  {value || placeholder}
                </Text>
                <Image
                  source={icons.DownArr} // Add this icon to your icons folder
                  className="w-8 h-8 text-white"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ) : (
              <TextInput
                className={`rounded-full p-4 font-pregular text-[18px] flex-1 ${inputStyle} text-left`}
                secureTextEntry={name === "password" && !showPassword}
                value={value} // <-- Controlled component value
                onChangeText={onChangeText} // <-- Update value on change
                placeholder={placeholder}
                {...props}
              />
            )}

            {name === "password" && !isSelect && (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                  source={!showPassword ? icons.eye : icons.eyehide}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Select Modal */}
          {isSelect && (
            <Modal visible={showSelectModal} transparent animationType="fade">
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.4)",
                  justifyContent: "center",
                  padding: 20,
                }}
                onPress={() => setShowSelectModal(false)}
                activeOpacity={1}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 12,
                    padding: 16,
                  }}
                >
                  <FlatList
                    data={selectOptions}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => handleSelect(item)}
                        style={{ paddingVertical: 12 }}
                      >
                        <Text className="text-black text-lg">{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </TouchableOpacity>
            </Modal>
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default FormField;
