import { ID } from "react-native-appwrite";
import { appwriteConf, client, account, database, storage } from "./appwrite";
import store from "../store/store";
import { login } from "../store/authSlice";

// export const createUserAccount = async (name, email, password) => {
//   try {
//     const response = await account.create(ID.unique(), email, password, name);

//     const userDb = await saveUserToDB(response);
//     if (!userDb) throw Error("Error saving user to DB");

//     const session = await signInUser(response.email, response.password);

//     return session;
//   } catch (error) {
//     console.log("Error creating user account:", error);
//   }
// };

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
    const response = await account.create(ID.unique(), email, password, name);

    const userDb = await saveUserToDB({
      user: response,
      age,
      gender,
      height_cm,
      weight_kg,
      goal,
      name,
    });

    if (!userDb) throw Error("Error saving user to DB");

    const session = await signInUser(response.email, response.password);

    return session;
  } catch (error) {
    console.log("Error creating user account:", error);
  }
};

export const signInUser = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    const user = await account.get();

    store.dispatch(login({ session, user }));
    console.log("Session: ", session);
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
      }
    );

    console.log("User saved to DB: ", response);
    return response;
  } catch (error) {
    console.log("Error saving user to DB: ", error);
  }
};
