// components/ImageCarousel.js
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  Image,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";

const { width } = Dimensions.get("window");

const ImageCarousel = ({ imageUrls }) => {
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (index + 1) % imageUrls.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
      setIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [index, imageUrls.length]);

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      className="w-full h-[220px]"
    >
      {imageUrls.map((url, idx) => (
        <View key={idx} className="relative w-screen h-[220px]">
          <Image
            source={{ uri: url }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            className="absolute top-0 left-0 right-0 bottom-0"
            locations={[0.6, 1]}
          />
          <TouchableOpacity
            className=" p-2 rounded"
            style={{
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
              display: "flex",
              top: "5%",
              right: "10%",
              position: "absolute",
            }}
          >
            <Ionicons size={24} name="bookmark-outline" color="#ffffff" className="shadow" />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default ImageCarousel;
