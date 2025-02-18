import { StyleSheet, Pressable, Image, TextInput } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    router.push('/onboarding/location');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const handleCreateAccount = () => {
    router.push('/signup');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/metaball.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <ThemedText style={styles.logoText}>Ride Split</ThemedText>
      </ThemedView>
      <ThemedView style={styles.content}>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Welcome Back</ThemedText>
          <ThemedText style={styles.subtitle}>Please sign in to continue</ThemedText>
        </ThemedView>

        <ThemedView style={styles.form}>
          <ThemedView style={styles.inputContainer}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
            />
          </ThemedView>

          <ThemedView style={styles.inputContainer}>
            <ThemedText style={styles.label}>Password</ThemedText>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#9ca3af"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password"
            />
          </ThemedView>

          <Pressable onPress={handleLogin} style={styles.button}>
            <ThemedText style={styles.buttonText}>Sign In</ThemedText>
          </Pressable>
          <Pressable onPress={handleForgotPassword} style={styles.linkContainer}>
            <ThemedText style={styles.linkText}>Forgot password?</ThemedText>
          </Pressable>
          <Pressable onPress={handleCreateAccount} style={styles.linkContainer}>
            <ThemedText style={styles.linkText}>Or create an account</ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'flex-start',
  },
  content: {
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    marginTop: 20,
    minHeight: 90,
    paddingVertical: 10,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 10,
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 38,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  subtitle: {
    color: '#6b7280',
    marginTop: 8,
    fontSize: 16,
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
    height: 40,
    backgroundColor: '#000000',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  linkContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  linkText: {
    color: '#0a7ea4',
    fontSize: 14,
  },
});
