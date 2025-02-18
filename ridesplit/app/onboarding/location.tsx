import { StyleSheet, View, Pressable, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LocationScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Set your locations</ThemedText>
      <ThemedText style={styles.subtitle}>Enter your home and school addresses</ThemedText>

      <View style={styles.form}>
        <View style={styles.locationContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="home-outline" size={24} color="#000000" />
          </View>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Home Address</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter your home address"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        <View style={styles.locationContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="school-outline" size={24} color="#000000" />
          </View>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>School Address</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter your school address"
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>

        <Pressable 
          style={styles.button}
          onPress={() => {
            router.push('/onboarding/schedule');
          }}
        >
          <ThemedText style={styles.buttonText}>Continue</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    gap: 24,
  },
  locationContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#000000',
  },
  button: {
    height: 48,
    backgroundColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 