import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function SignupScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Sign Up</ThemedText>
      <ThemedText>Create a new account.</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
}); 