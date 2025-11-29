/**
 * Minimal reproduction for @expo/ui SwiftUI Button crash on iOS 26
 * 
 * Bug: SwiftUI Button crashes when rendered in React Navigation header
 * Error: -[(dynamic class) _isAncestorOfFirstResponder]: unrecognized selector
 * 
 * Steps to reproduce:
 * 1. Run on iOS 26 device/simulator
 * 2. Tap "Open Modal" button
 * 3. App crashes when trying to render the SwiftUI Button in headerLeft
 */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '@expo/ui/swift-ui';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>@expo/ui Crash Reproduction</Text>
      <Text style={styles.subtitle}>iOS 26 - SwiftUI Button in Navigation Header</Text>
      
      <Pressable 
        style={styles.button}
        onPress={() => navigation.navigate('Modal')}
      >
        <Text style={styles.buttonText}>Open Modal (triggers crash)</Text>
      </Pressable>
      
      <StatusBar style="auto" />
    </View>
  );
}

function ModalScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal Screen</Text>
      <Text style={styles.subtitle}>If you see this, the bug didn't occur</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen 
          name="Modal" 
          component={ModalScreen}
          options={({ navigation }) => ({
            title: 'Modal',
            presentation: 'modal',
            // This SwiftUI Button causes the crash on iOS 26
            headerLeft: () => (
              <Button
                onPress={() => navigation.goBack()}
                systemImage="xmark"
                variant="glass"
                controlSize="small"
                role="cancel"
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
