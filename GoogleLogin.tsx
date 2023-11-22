import { useState, useEffect, useCallback } from "react";
import { Button, Text } from "react-native";
import { useIdTokenAuthRequest as useGoogleIdTokenAuthRequest } from "expo-auth-session/providers/google";
import {
  signInWithCredential,
  GoogleAuthProvider,
  User,
  initializeAuth,
  getReactNativePersistence,
  OAuthCredential,
} from "firebase/auth/react-native";
import {
  androidClientId,
  app,
  expoClientId,
  iosClientId,
} from "./firebaseConfig";
import * as SecureStore from "expo-secure-store";

// Para remover datos no alphanumericos
const replaceNonAlphaNumericValues = (key: string) =>
  key.replaceAll(/[^a-zA-Z\d\s]/g, "");

// Utilizamos la persistencia de Reactnative para guardar tokens
const myReactNativeLocalPersistence = getReactNativePersistence({
  async getItem(key) {
    return SecureStore.getItemAsync(replaceNonAlphaNumericValues(key));
  },
  setItem(key, value) {
    return SecureStore.setItemAsync(replaceNonAlphaNumericValues(key), value);
  },
  removeItem(key) {
    return SecureStore.deleteItemAsync(replaceNonAlphaNumericValues(key));
  },
});

// creamos una instancia de Firebase
const auth = initializeAuth(app, {
  persistence: myReactNativeLocalPersistence,
});


// Usamos useState para guardar los tokens
export const GoogleLogin: React.FC = () => {
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState<User | null>(null);

  // Se setea el usuario
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  // Hook the React Native para autenticar
  const [, googleResponse, promptAsyncGoogle] = useGoogleIdTokenAuthRequest({
    selectAccount: true,
    expoClientId,
    iosClientId,
    androidClientId,
  });

  // El login se maneja por google (en el navegador del sistema)
  const handleLoginGoogle = async () => {
    await promptAsyncGoogle();
  };

  // Pasamos el token a Firebase, al que pasa la autenticación
  const loginToFirebase = useCallback(async (credentials: OAuthCredential) => {
    const signInResponse = await signInWithCredential(auth, credentials);
    const token = await signInResponse.user.getIdToken();
  }, []);

  useEffect(() => {
    if (googleResponse?.type === "success") {
      const credentials = GoogleAuthProvider.credential(
        googleResponse.params.id_token
      );
      loginToFirebase(credentials);
    }
  }, [googleResponse]);

  // si se hace logout, de nuevo se registra en la API de Google
  const handleLogoutGoogle = () => {
    auth.signOut();
    setUser(null);
  };

  return (
    <>
      {user ? (
        <>
          <Button title={"Salir"} onPress={handleLogoutGoogle} />
          <Text>Ha ingresado correctamente como:</Text>
          <Text>{user.displayName}</Text>
          <Text>{user.email}</Text>
        </>
      ) : (
        <Button title={"Ingresar con Google"} onPress={handleLoginGoogle} />
      )}
    </>
  );
};
