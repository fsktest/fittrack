import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CategoryScroll from "../../components/CategoryScroll";
import { getAllExercises } from "../../../api/appwrite.api";
import ExerciseList from "../../components/ExerciseList";
import { Ionicons } from "@expo/vector-icons";
import { setExercise as setExerciseRedux } from "../../../store/exerciseSlice";
import { useDispatch, useSelector } from "react-redux";

const Exercise = () => {
  const [selected, setSelected] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [refreshing, setRefreshing] = useState(false);
  const ArrExer = [
    "All",
    "Biceps",
    "Triceps",
    "Shoulder",
    "Chest",
    "Back",
    "Legs",
  ];
  const [allExercises, setAllExercises] = useState([]);
  const [exercise, setExercise] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [filteredExercises, setFilteredExercises] = useState([]);

  const dispatch = useDispatch();
  const exercises = useSelector((state) => state.exercise.exercise);
  // Access exercises from Redux

  // useEffect(() => {
  //   const fetchExercises = async () => {
  //     try {
  //       const response = await getAllExercises();
  //       dispatch(setExerciseRedux(response)); // Save to Redux
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchExercises();
  // }, []);
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await getAllExercises();
        setAllExercises(response); // Set original source
        setExercise(response); // Initially show all
      } catch (error) {
        console.log(error);
      }
    };

    fetchExercises();
  }, []);
  // useEffect(() => {
  //   let filtered = exercises;

  //   const query = `${searchQuery} ${selected !== "All" ? selected : ""}`
  //     .toLowerCase()
  //     .trim();

  //   if (query !== "") {
  //     filtered = filtered.filter((ex) =>
  //       `${ex.name} ${ex.muscles} ${ex.force} ${ex.category}`
  //         .toLowerCase()
  //         .includes(query)
  //     );
  //   }

  //   setFilteredExercises(filtered);
  // }, [selected, searchQuery, exercises]);

  useEffect(() => {
    let filtered = allExercises;

    const query = `${searchQuery} ${selected !== "All" ? selected : ""}`
      .toLowerCase()
      .trim();

    if (query !== "") {
      filtered = filtered.filter((ex) =>
        `${ex.name} ${ex.muscles} ${ex.force} ${ex.category}`
          .toLowerCase()
          .includes(query)
      );
    }

    setExercise(filtered);
  }, [selected, searchQuery, allExercises]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await getAllExercises();
      setAllExercises(response); // Replace local source
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  // console.log("Exercise: ", exercise[0]);
  return (
    <SafeAreaView className="flex-1 bg-bgPrimary">
      <View className="flex-1 px-4 mt-4">
        <Text className="text-textPrimary text-3xl">Explore Exercises 💪</Text>
        {/* Fixed Header */}
        <View className="z-10 mb-4 ">
          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <FormField
                containerStyle=""
                placeholder="Search for exercises"
                placeholderStyle="#A4A4A4"
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>

            <TouchableOpacity
              onPress={() => setShowCategory((prev) => !prev)}
              className="bg-bgSecondary rounded h-[60px] px-4 flex items-center justify-center"
            >
              <Ionicons name="funnel-outline" size={24} color="#A4A4A4" />
            </TouchableOpacity>
          </View>
          {showCategory && (
            <CategoryScroll
              categories={ArrExer}
              selected={selected}
              setSelected={setSelected}
            />
          )}
        </View>

        <ExerciseList
          exercise={exercise}
          refreshing={refreshing}
          handleRefresh={handleRefresh}
        />
      </View>
    </SafeAreaView>
  );
};

export default Exercise;
