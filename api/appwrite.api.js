import { Avatars, ID, Query } from "react-native-appwrite";
import {
  appwriteConf,
  client,
  account,
  database,
  storage,
  avatar,
  userInitials,
} from "./appwrite";
import store from "../store/store";
import { login, logout } from "../store/authSlice";
import * as SecureStore from "expo-secure-store";

export const createUserAccount = async (
  name,
  email,
  password,
  age,
  gender,
  height_cm,
  weight_kg,
  goal
) => {
  try {
    // Step 1: Create user
    const response = await account.create(ID.unique(), email, password, name);

    // Step 2: Sign in user right after account creation
    const session = await signInUser(email, password);

    const avatarUrl = avatar.getInitials(name);
    console.log("avatarUrl:", avatarUrl.toString());
    //  const avatar.toString()

    // Step 3: Save user data to database (now that session is active)
    const userDb = await saveUserToDB({
      user: response,
      age,
      gender,
      height_cm,
      weight_kg,
      goal,
      name,
      avatar: avatarUrl.toString(),
    });

    if (!userDb) throw Error("Error saving user to DB");

    return session;
  } catch (error) {
    console.log("Error creating user account:", error);
    throw error; // So the caller gets notified
  }
};

export const signInUser = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    const currentUser = await getCurrentUser(user.$id);

    // console.log("user: ", currentUser);
    console.log("🔍 currentUser before dispatch:", currentUser);
    await SecureStore.setItemAsync("currentUser", JSON.stringify(currentUser));

    store.dispatch(login({ session, user, currentUser }));
    // console.log("Session: ", session);
    return session;
  } catch (error) {
    console.log("Error signing in user:", error);
  }
};

export const saveUserToDB = async ({
  user,
  age,
  gender,
  height_cm,
  weight_kg,
  goal,
  name,
  avatar,
}) => {
  try {
    const response = await database.createDocument(
      appwriteConf.databaseID,
      appwriteConf.userCollectionID,
      ID.unique(),
      {
        userId: user.$id,
        name,
        age,
        gender,
        height_cm,
        weight_kg,
        goal,
        avatar,
      }
    );

    console.log("User saved to DB: ", response);
    return response;
  } catch (error) {
    console.log("Error saving user to DB: ", error);
  }
};

export const signOutUser = async () => {
  try {
    await account.deleteSession("current");
    store.dispatch(logout());
  } catch (error) {
    console.log("Error signing out user:", error);
  }
};

export const getUserInitials = async (username) => {
  try {
    const result = await avatar.getInitials(username);
    console.log("User initials: ", result);
    return result;
  } catch (error) {
    console.log("Error getting user initials:", error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error("No current account found");

    const currentUser = await database.listDocuments(
      appwriteConf.databaseID,
      appwriteConf.userCollectionID,
      [Query.equal("userId", currentAccount.$id)]
    );

    if (!currentUser || currentUser.documents.length === 0) {
      throw new Error("No matching user found in database");
    }

    return currentUser.documents[0];
  } catch (error) {
    console.log("❌ Error in Getting Current USER: ", error.message);
    return null; // return null explicitly
  }
};

export const getAllExercises = async () => {
  const limit = 100;
  let offset = 0;
  let allDocuments = [];

  try {
    while (true) {
      const response = await database.listDocuments(
        appwriteConf.databaseID,
        appwriteConf.exerciseCollectionID,
        [Query.limit(limit), Query.offset(offset)]
      );

      const exercisesWithImageUrls = await Promise.all(
        response.documents.map(async (item) => {
          let imageUrls = [];

          if (item.image_ids && item.image_ids.length > 0) {
            imageUrls = item.image_ids.map(
              (id) => storage.getFileView(appwriteConf.bucketID, id).href
            );
          }

          return { ...item, imageUrls };
        })
      );

      allDocuments = [...allDocuments, ...exercisesWithImageUrls];

      if (response.documents.length < limit) break;
      offset += limit;
    }

    return allDocuments;
  } catch (error) {
    console.log("Error getting all exercises:", error);
  }
};

export const getExerciseById = async (id) => {
  try {
    const response = await database.getDocument(
      appwriteConf.databaseID,
      appwriteConf.exerciseCollectionID,
      id
    );

    let imageUrls = [];

    if (response.image_ids && response.image_ids.length > 0) {
      imageUrls = response.image_ids.map(
        (imageId) => storage.getFileView(appwriteConf.bucketID, imageId).href
      );
    }

    const exerciseWithImageUrls = { ...response, imageUrls };

    return exerciseWithImageUrls;
  } catch (error) {
    console.error("Error getting exercise by ID:", error);
    return null;
  }
};

export const getImageById = async (id) => {
  try {
    const response = await storage.getFileView(appwriteConf.bucketID, id);
    return response;
  } catch (error) {
    console.log("Error getting image by ID:", error);
  }
};
