import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="signup" 
          options={{ 
            title: 'Sign Up',
            headerShown: true,
            headerBackTitle: 'Back',
          }} 
        />
        <Stack.Screen 
          name="forgot-password" 
          options={{ 
            title: 'Forgot Password',
            headerShown: true,
            headerBackTitle: 'Back',
          }} 
        />
        <Stack.Screen 
          name="confirm-schedule" 
          options={{ 
            title: 'Confirm Schedule',
            headerShown: true,
            headerBackTitle: 'Back',
          }} 
        />
        <Stack.Screen 
          name="onboarding/location" 
          options={{ 
            title: 'Set Locations',
            headerShown: true,
            headerBackTitle: 'Back',
          }} 
        />
        <Stack.Screen 
          name="onboarding/schedule" 
          options={{ 
            title: 'Set Schedule',
            headerShown: true,
            headerBackTitle: 'Back',
          }} 
        />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
