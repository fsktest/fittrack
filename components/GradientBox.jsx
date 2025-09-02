import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const GradientBorderBox = (containerStyle) => {
  return (
    <TouchableOpacity style={styles.outerBox} className={`${containerStyle}`}>
      <View style={styles.innerBox}>
        <Text style={styles.percentage}>86%</Text>
        <Text style={styles.time}>4:03:00</Text>
        <Text style={styles.label}>Sleep Hours</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  outerBox: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 10,
    padding: 2,
    backgroundColor: "transparent",
    // Simulated gradient with layered View
    borderWidth: 2,
    borderColor: "#1D1D1D",
    overflow: "hidden",
    position: "relative",
  },
  innerBox: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  percentage: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  time: {
    color: "#32CD32",
    marginTop: 4,
    fontSize: 16,
  },
  label: {
    color: "#ffffff",
    marginTop: 4,
    fontSize: 14,
  },
});

export default GradientBorderBox;
