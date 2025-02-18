import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import React from 'react';

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
      days: 'Monday to Friday',
      dropoff: '8:30 am',
      pickup: '5pm',
    },
    pricePerWeek: 84,
    otherRiders: 2,
  },
  {
    id: '2',
    name: 'Jane Smith',
    imageUrl: 'https://via.placeholder.com/100',
    schedule: {
      days: 'Monday to Friday',
      dropoff: '9:00 am',
      pickup: '5:30pm',
    },
    pricePerWeek: 95,
    otherRiders: 2,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    imageUrl: 'https://via.placeholder.com/100',
    schedule: {
      days: 'Monday to Friday',
      dropoff: '8:00 am',
      pickup: '4:30pm',
    },
    pricePerWeek: 120,
    otherRiders: 2,
  },
];

export default function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Best matches for you</ThemedText>
      <ScrollView style={styles.scrollView}>
        {DRIVERS.map((driver) => (
          <Pressable 
            key={driver.id}
            style={styles.driverCard}
            onPress={() => {
              // Handle driver selection
            }}
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
                <Text style={styles.riders}>{driver.otherRiders} other riders</Text>
                <Text style={styles.price}>{driver.pricePerWeek}$/week</Text>
              </View>
            </View>
            <Pressable 
              style={styles.moreDetails}
              onPress={() => {
                // Handle more details
              }}
            >
              <Text style={styles.moreDetailsText}>more details...</Text>
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>
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
  moreDetails: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  moreDetailsText: {
    color: '#6b7280',
    fontSize: 14,
  },
});
