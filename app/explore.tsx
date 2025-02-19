import { StyleSheet, View, Text, Image, ScrollView, Pressable, Animated } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import React, { useState, useEffect, useRef } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type Driver = {
  id: string;
  name: string;
  imageUrl: string;
  schedule: {
    days: string;
    dropoff: string;
    pickup: string;
  };
  pricePerWeek: number;
  otherRiders: number;
};

// Mock data for demonstration
const DRIVERS: Driver[] = [
  {
    id: '1',
    name: 'John Doe',
    imageUrl: 'https://via.placeholder.com/100',
    schedule: {
      days: 'Monday',
      dropoff: '8:30 am',
      pickup: '5:00 pm',
    },
    pricePerWeek: 25,
    otherRiders: 0,
  },
  {
    id: '2',
    name: 'Jane Smith',
    imageUrl: 'https://via.placeholder.com/100',
    schedule: {
      days: 'Tuesday',
      dropoff: '9:00 am',
      pickup: '5:30 pm',
    },
    pricePerWeek: 30,
    otherRiders: 1,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    imageUrl: 'https://via.placeholder.com/100',
    schedule: {
      days: 'Wednesday',
      dropoff: '8:00 am',
      pickup: '4:30 pm',
    },
    pricePerWeek: 35,
    otherRiders: 3,
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    imageUrl: 'https://via.placeholder.com/100',
    schedule: {
      days: 'Thursday',
      dropoff: '8:45 am',
      pickup: '5:15 pm',
    },
    pricePerWeek: 28,
    otherRiders: 2,
  },
  {
    id: '5',
    name: 'David Brown',
    imageUrl: 'https://via.placeholder.com/100',
    schedule: {
      days: 'Friday',
      dropoff: '9:15 am',
      pickup: '5:45 pm',
    },
    pricePerWeek: 32,
    otherRiders: 1,
  },
  {
    id: '6',
    name: 'Emily Davis',
    imageUrl: 'https://via.placeholder.com/100',
    schedule: {
      days: 'Monday',
      dropoff: '8:15 am',
      pickup: '4:45 pm',
    },
    pricePerWeek: 40,
    otherRiders: 2,
  },
  {
    id: '7',
    name: 'Alex Turner',
    imageUrl: 'https://via.placeholder.com/100',
    schedule: {
      days: 'Wednesday',
      dropoff: '9:30 am',
      pickup: '6:00 pm',
    },
    pricePerWeek: 22,
    otherRiders: 3,
  },
];

export default function ExploreScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [availableDrivers, setAvailableDrivers] = useState(DRIVERS);
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (isLoading) {
      const fadeIn = Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      });
      const fadeOut = Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 1000,
        useNativeDriver: true,
      });

      Animated.loop(
        Animated.sequence([fadeIn, fadeOut])
      ).start();

      // Simulate loading time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
        fadeAnim.stopAnimation();
      };
    }
  }, [isLoading]);

  const handleConfirm = () => {
    router.push('/(tabs)/groups');
  };

  const handleRemoveDriver = (driverId: string) => {
    setAvailableDrivers(prev => prev.filter(driver => driver.id !== driverId));
  };

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, styles.loadingContainer]}>
        <Animated.Image
          source={require('@/assets/images/metaball.png')}
          style={[styles.loadingLogo, { opacity: fadeAnim }]}
        />
        <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
          Loading...
        </Animated.Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>{availableDrivers.length} Matches Found!</ThemedText>
      <ScrollView style={styles.scrollView}>
        {availableDrivers.map((driver) => (
          <Pressable 
            key={driver.id}
            style={styles.driverCard}
          >
            <View style={styles.driverInfo}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: driver.imageUrl }}
                  style={styles.avatar}
                />
                <Text style={styles.driverName}>{driver.name}</Text>
                <Text style={styles.label}>Driver</Text>
              </View>
              <View style={styles.scheduleInfo}>
                <Text style={styles.schedule}>{driver.schedule.days}</Text>
                <Text style={styles.schedule}>{driver.schedule.dropoff} - {driver.schedule.pickup}</Text>
                <Text style={styles.riders}>
                  {driver.otherRiders === 0 ? (
                    <Text style={styles.searchingText}>Searching for riders...</Text>
                  ) : (
                    `${driver.otherRiders} other ${driver.otherRiders === 1 ? 'rider' : 'riders'}`
                  )}
                </Text>
                <Text style={styles.price}>Projected: ${driver.pricePerWeek}/week</Text>
              </View>
            </View>
            <Pressable 
              style={styles.removeButton}
              onPress={() => handleRemoveDriver(driver.id)}
            >
              <Ionicons name="close-circle" size={24} color="#ef4444" />
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable 
          style={[
            styles.confirmButton,
            availableDrivers.length === 0 && styles.confirmButtonDisabled
          ]}
          onPress={handleConfirm}
          disabled={availableDrivers.length === 0}
        >
          <Text style={styles.confirmButtonText}>Confirm All Matches</Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  driverCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    marginBottom: 8,
  },
  driverName: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  label: {
    color: '#6b7280',
    fontSize: 12,
  },
  scheduleInfo: {
    flex: 1,
  },
  schedule: {
    color: '#374151',
    fontSize: 14,
    marginBottom: 4,
  },
  riders: {
    color: '#374151',
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
  },
  buttonContainer: {
    paddingTop: 16,
  },
  confirmButton: {
    height: 48,
    backgroundColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLogo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#6b7280',
  },
  searchingText: {
    color: '#6b7280',
    fontStyle: 'italic',
  },
  removeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  confirmButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
}); 