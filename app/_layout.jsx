import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SplashScreen, Stack, useRouter, useSegments } from "expo-router";
import "../global.css";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Provider, useSelector } from "react-redux";
import store from "../store/store";

SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isAuthGroup = segments.includes("(auth)") || segments[0] === "index";

    console.log("isLoggedIn:", isLoggedIn);
    console.log("segments:", segments);
    console.log("isAuthGroup:", isAuthGroup);

    if (!isLoggedIn && !isAuthGroup) {
      router.replace("/(auth)/signin");
    } else if (isLoggedIn && isAuthGroup) {
      router.replace("/dashboard");
    }
  }, [isLoggedIn, segments]);

  return (
    <>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
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
