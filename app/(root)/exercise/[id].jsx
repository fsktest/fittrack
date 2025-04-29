import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useRef } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getExerciseById } from "../../../api/appwrite.api";

const { width, height } = Dimensions.get("window");

const Exercise = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [modalActiveIndex, setModalActiveIndex] = useState(0);
  const modalFlatListRef = useRef(null);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await getExerciseById(id);
        console.log("Response:", response);
        setExercise(response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchExercises();
  }, [id]);

  // Function to open the modal with the selected image index
  const openImageModal = (index) => {
    setModalActiveIndex(index);
    setModalVisible(true);

    // Small delay to ensure the FlatList is rendered before scrolling
    setTimeout(() => {
      if (modalFlatListRef.current) {
        modalFlatListRef.current.scrollToIndex({
          index: index,
          animated: false,
        });
      }
    }, 100);
  };

  // Handle back navigation
  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-bgPrimary">
        <Text className="text-lg text-white">Loading exercise details...</Text>
      </View>
    );
  }

  if (!exercise) {
    return (
      <View className="flex-1 items-center justify-center bg-bgPrimary">
        <Text className="text-lg text-white">Exercise not found</Text>
      </View>
    );
  }

  // Convert instructions string to array
  const instructionSteps = exercise.instructions
    .split(",")
    .map((step) => step.trim());

  // Determine exercise duration and calories (using placeholder values)
  const duration = "10 minutes";
  const calories = "100 cal";

  // Determine difficulty level
  const level = exercise.level || "beginner";

  // Convert muscles to arrays
  const primaryMuscles = exercise.primary_muscles
    ? exercise.primary_muscles.split(",").map((m) => m.trim())
    : [];
  const secondaryMuscles = exercise.secondary_muscles
    ? exercise.secondary_muscles.split(",").map((m) => m.trim())
    : [];

  // Combine all muscles worked
  const musclesWorked = [...primaryMuscles, ...secondaryMuscles].filter(
    Boolean
  );

  // Render image slider
  const renderImageSlider = () => {
    if (!exercise.imageUrls || exercise.imageUrls.length === 0) {
      return null;
    }

    return (
      <View className="w-full" style={{ height: "100%" }}>
        <FlatList
          data={exercise.imageUrls}
          keyExtractor={(item, index) => `image-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const slideIndex = Math.floor(
              event.nativeEvent.contentOffset.x / width
            );
            setActiveImageIndex(slideIndex);
          }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ width }}
              className="h-full"
              onPress={() => openImageModal(index)}
            >
              <Image
                source={{ uri: item }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />

        {/* Pagination dots */}
        {exercise.imageUrls.length > 1 && (
          <View className="flex-row justify-center space-x-1 mt-2 absolute bottom-2 w-full">
            {exercise.imageUrls.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full ${
                  activeImageIndex === index ? "bg-green-500" : "bg-gray-500"
                }`}
              />
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View className="flex-1 bg-bgPrimary">
      {/* Back button with high z-index */}
      <TouchableOpacity
        className="absolute top-12 left-4 z-50 bg-black  rounded-full p-2"
        onPress={handleGoBack}
      >
        <Ionicons name="arrow-back" size={28} color="#9BEC00" />
      </TouchableOpacity>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
      >
        {/* Image Slider */}
        <View className="w-full" style={{ height: 300 }}>
          {renderImageSlider()}
        </View>

        {/* Exercise Title and Metrics */}
        <View className="px-4 py-5">
          <Text className="text-2xl font-bold text-white mb-2">
            {exercise.name}
          </Text>

          <View className="flex-row items-center gap-3 mb-4">
            <View className="flex-row items-center">
              <Ionicons name="time-outline" size={18} color="#999" />
              <Text className="text-gray-400 ml-1">{duration}</Text>
            </View>

            <View className="flex-row items-center">
              <Ionicons name="flame-outline" size={18} color="#999" />
              <Text className="text-gray-400 ml-1">{calories}</Text>
            </View>

            <View className="bg-btnPrimary px-3 py-1 rounded">
              <Text className="text-black text-xs">
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </View>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-white mb-2">
              Description
            </Text>
            <Text className="text-gray-400">
              The {exercise.name.toLowerCase()} is a {exercise.mechanic}
              {exercise.category} exercise that targets the
              {exercise.primary_muscles}.
            </Text>
          </View>

          {/* Muscles Worked */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-white mb-2">
              Muscles Worked
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {musclesWorked.map((muscle, index) => (
                <View
                  key={index}
                  className="border border-btnPrimary px-3 py-1 rounded"
                >
                  <Text className="text-white">
                    {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* How to Perform */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-white mb-4">
              How to Perform
            </Text>
            {instructionSteps.map((step, index) => (
              <View key={index} className="flex-row mb-4">
                <View className="w-8 h-8 rounded-full bg-btnPrimary items-center justify-center mr-3">
                  <Text className="text-black font-semibold">{index + 1}</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-gray-300">{step}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Related Exercises */}
          <TouchableOpacity className="bg-btnPrimary flex items-center justify-center mb-4 py-4 rounded-md">
            <Text className="text-lg font-medium text-center text-black">
              Add to Routine
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Scrollable Image Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black">
          {/* Close button */}
          <TouchableOpacity
            className="absolute top-12 right-6 z-10"
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close-circle" size={40} color="#fff" />
          </TouchableOpacity>

          {/* Image counter */}
          <View className="absolute top-12 left-6 z-10 bg-black bg-opacity-50 px-3 py-1 rounded-full">
            <Text className="text-white font-medium">
              {modalActiveIndex + 1}/{exercise.imageUrls.length}
            </Text>
          </View>

          {/* Full-screen image gallery */}
          <FlatList
            ref={modalFlatListRef}
            data={exercise.imageUrls}
            keyExtractor={(item, index) => `modal-image-${index}`}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={modalActiveIndex}
            onMomentumScrollEnd={(event) => {
              const slideIndex = Math.floor(
                event.nativeEvent.contentOffset.x / width
              );
              setModalActiveIndex(slideIndex);
            }}
            renderItem={({ item }) => (
              <View
                style={{ width, height }}
                className="justify-center items-center"
              >
                <Image
                  source={{ uri: item }}
                  style={{ width: width, height: height * 0.8 }}
                  resizeMode="contain"
                />
              </View>
            )}
          />

          {/* Pagination dots */}
          {exercise.imageUrls.length > 1 && (
            <View className="flex-row justify-center space-x-2 absolute bottom-10 w-full">
              {exercise.imageUrls.map((_, index) => (
                <View
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    modalActiveIndex === index ? "bg-white" : "bg-gray-500"
                  }`}
                />
              ))}
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default Exercise;
