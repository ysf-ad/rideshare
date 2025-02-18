import { StyleSheet, View, Image, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.avatar}
        />
        <ThemedText style={styles.name}>John Doe</ThemedText>
        <ThemedText style={styles.email}>john.doe@example.com</ThemedText>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Your Locations</ThemedText>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="home-outline" size={20} color="#000000" />
            </View>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoLabel}>Home</ThemedText>
              <ThemedText style={styles.infoValue}>123 Home Street</ThemedText>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="school-outline" size={20} color="#000000" />
            </View>
            <View style={styles.infoContent}>
              <ThemedText style={styles.infoLabel}>School</ThemedText>
              <ThemedText style={styles.infoValue}>456 School Avenue</ThemedText>
            </View>
          </View>
          <Pressable 
            style={styles.editButton}
            onPress={() => {
              router.push('/onboarding/location');
            }}
          >
            <ThemedText style={styles.editButtonText}>Edit Locations</ThemedText>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Your Schedule</ThemedText>
        <View style={styles.infoCard}>
          <View style={styles.scheduleRow}>
            <ThemedText style={styles.scheduleDay}>Monday - Friday</ThemedText>
            <ThemedText style={styles.scheduleTime}>8:30 AM - 5:00 PM</ThemedText>
          </View>
          <Pressable 
            style={styles.editButton}
            onPress={() => {
              router.push('/onboarding/schedule');
            }}
          >
            <ThemedText style={styles.editButtonText}>Edit Schedule</ThemedText>
          </Pressable>
        </View>
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
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f3f4f6',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#000000',
  },
  scheduleRow: {
    marginBottom: 16,
  },
  scheduleDay: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
    marginBottom: 4,
  },
  scheduleTime: {
    fontSize: 14,
    color: '#374151',
  },
  editButton: {
    height: 36,
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
}); 