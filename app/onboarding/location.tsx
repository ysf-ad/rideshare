import React from 'react';
import { StyleSheet, View, Pressable, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { useState } from 'react';

interface Location {
  address: string;
}

export default function LocationScreen() {
  const [homeLocation, setHomeLocation] = useState<Location | null>(null);
  const [schoolLocation, setSchoolLocation] = useState<Location | null>(null);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>Set your locations</ThemedText>
        <ThemedText style={styles.subtitle}>Enter your home and school addresses</ThemedText>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Home Address</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter your home address"
              placeholderTextColor="#9ca3af"
              value={homeLocation?.address || ''}
              onChangeText={(text) => setHomeLocation({ address: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>School Address</ThemedText>
            <TextInput
              style={styles.input}
              placeholder="Enter your school address"
              placeholderTextColor="#9ca3af"
              value={schoolLocation?.address || ''}
              onChangeText={(text) => setSchoolLocation({ address: text })}
            />
          </View>

          <Pressable 
            style={[
              styles.button,
              (!homeLocation?.address || !schoolLocation?.address) && styles.buttonDisabled
            ]}
            onPress={() => {
              if (homeLocation?.address && schoolLocation?.address) {
                router.push('/onboarding/schedule-option');
              }
            }}
            disabled={!homeLocation?.address || !schoolLocation?.address}
          >
            <ThemedText style={styles.buttonText}>Continue</ThemedText>
          </Pressable>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  content: {
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#6b7280',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
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
  buttonDisabled: {
    backgroundColor: '#9ca3af',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 