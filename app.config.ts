import { ExpoConfig } from "expo/config";
import { config } from "dotenv";
import path from "path";

const env_file = path.join(__dirname, ".env");
const env = config({
  path: env_file,
});

if (env.error) {
  console.log("ENV FILE ERROR: ", env_file);
  throw env.error;
}

export const expoConfig: ExpoConfig = {
  scheme: "your-scheme",
  name: "your-name",
  slug: "your-slug",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },

  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "your.identifier",
    supportsTablet: true,
  },
  android: {
    package: "your.identifier",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },

    intentFilters: [
      {
        action: "VIEW",
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    ...env.parsed,
  },
};

export default expoConfig;
