
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d3218cc912714688951d0fb714bf1dc7',
  appName: 'maze-runner-replay-arena',
  webDir: 'dist',
  server: {
    url: 'https://d3218cc9-1271-4688-951d-0fb714bf1dc7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#9333EA",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP"
    }
  }
};

export default config;
