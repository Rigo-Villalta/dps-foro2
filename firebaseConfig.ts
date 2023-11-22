import { initializeApp } from "firebase/app";
import Constants from "expo-constants";

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY ?? "",
  authDomain: Constants.expoConfig?.extra?.FIREBASE_DOMAIN ?? "",
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID ?? "",
};

export const expoClientId = Constants.expoConfig?.extra?.EXPO_CLIENT_ID;
export const iosClientId = Constants.expoConfig?.extra?.ANDROID_CLIENT_ID;
export const androidClientId = Constants.expoConfig?.extra?.IOS_CLIENT_ID;

export const app = initializeApp(firebaseConfig);
