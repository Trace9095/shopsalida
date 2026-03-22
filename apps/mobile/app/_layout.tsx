import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#0A0A0F" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#13131A' },
          headerTintColor: '#E2E8F0',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#0A0A0F' },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="shop/[slug]" options={{ title: 'Shop Details' }} />
      </Stack>
    </SafeAreaProvider>
  )
}
