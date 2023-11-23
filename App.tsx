import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { GoogleLogin } from "./GoogleLogin";

export default function App() {
  return (
    <View style={styles.container}>
      <GoogleLogin></GoogleLogin>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
