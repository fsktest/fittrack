import {
  Account,
  Client,
  ID,
  Storage,
  Databases,
  Avatars,
} from "react-native-appwrite";

export const appwriteConf = {
  api_url: process.env.EXPO_PUBLIC_API_URL,
  projectID: process.env.EXPO_PUBLIC_PROJECT_ID,
  databaseID: process.env.EXPO_PUBLIC_DATABASE_ID,
  userCollectionID: process.env.EXPO_PUBLIC_USER_COLLECTION,
  exerciseCollectionID: process.env.EXPO_PUBLIC_EXERCISE_COLLECTION,
  workoutCollectionID: process.env.EXPO_PUBLIC_WORKOUTS_COLLECTION,
  workoutExerciseCollectionID:
    process.env.EXPO_PUBLIC_WORKOUTEXERCISE_COLLECTION,
  dailySetsCollectionID: process.env.EXPO_PUBLIC_DAILYSETS_COLLECTION,
  mealsCollectionID: process.env.EXPO_PUBLIC_MEALS_COLLECTION,
  goalsCollectionID: process.env.EXPO_PUBLIC_GOALS_COLLECTION,
  bucketID: process.env.EXPO_PUBLIC_BUCKET_ID,
};

export const client = new Client()
  .setEndpoint(appwriteConf.api_url)
  .setProject(appwriteConf.projectID);

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const avatar = new Avatars(client);

export const userInitials = async (username) => {
  try {
    const result = await avatar.getInitials(username);
    console.log("User initials: ", result);
    return result;
  } catch (error) {
    console.log("Error getting user initials:", error);
  }
};
