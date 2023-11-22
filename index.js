import { registerRootComponent } from "expo";

import App from "./App";

// Esta función carga la raiz de la aplicación a Expo Go, de forma que se pueda
// Utilizar sin cargar la APK directamente al sistema
registerRootComponent(App);
