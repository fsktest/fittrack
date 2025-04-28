import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CategoryScroll from "../../components/CategoryScroll";
import { getAllExercises } from "../../../api/appwrite.api";
import ExerciseList from "../../components/ExerciseList";

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

  

  console.log("Exercise: ", exercise[0]);
  return (
    <SafeAreaView className="flex-1 bg-bgPrimary">
      <View className="flex-1 px-4 mt-4">
        <Text className="text-textPrimary text-3xl">Explore Exercises 💪</Text>
        {/* Fixed Header */}
        <View className="z-10 mb-4">
          <FormField
            placeholder="Search for exercises"
            placeholderStyle="#434343"
            onChangeText={(text) => setSearchQuery(text)}
          />
          <CategoryScroll
            categories={ArrExer}
            selected={selected}
            setSelected={setSelected}
          />
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
