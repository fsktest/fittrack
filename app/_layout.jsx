import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Slot, SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import "../global.css";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Provider, useSelector } from "react-redux";
import store from "../store/store";
import { useDispatch } from "react-redux";
import { account } from "../api/appwrite";
import { logout, login as setLogin } from "../store/authSlice";

SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const segments = useSegments();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // ✅ Restore session from Appwrite if present
    const checkSession = async () => {
      try {
        const session = await account.get();
        console.log("session:", session);
        if (session) {
          dispatch(setLogin(session));
        }
      } catch (error) {
        dispatch(logout()); // no session found 
      }
    };

    checkSession();
  }, []);

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);

    if (!isLoggedIn) {
      router.replace("/signin");
    } else if (isLoggedIn) {
      router.replace("/(root)");
    }
  }, [isLoggedIn]);

  return (
    <>
      <StatusBar style="auto" />
      <Slot />
    </>
  );
};

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
