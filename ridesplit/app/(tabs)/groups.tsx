import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

type Rider = {
  id: string;
  name: string;
  imageUrl: string;
};

type Group = {
  id: string;
  driver: {
    name: string;
    imageUrl: string;
  };
  riders: Rider[];
  schedule: {
    day: string;
    dropoff: string;
    pickup: string;
  };
  pricePerWeek: number;
  route: {
    pickup: string;
    dropoff: string;
  };
};

const GROUPS: Group[] = [
  {
    id: '1',
    driver: {
      name: 'John Doe',
      imageUrl: 'https://via.placeholder.com/100',
    },
    riders: [
      { id: '1', name: 'Alice Smith', imageUrl: 'https://via.placeholder.com/100' },
      { id: '2', name: 'Bob Wilson', imageUrl: 'https://via.placeholder.com/100' },
    ],
    schedule: {
      day: 'Monday',
      dropoff: '8:30 am',
      pickup: '5:00 pm',
    },
    pricePerWeek: 25,
    route: {
      pickup: '123 Home St',
      dropoff: '456 School Ave',
    },
  },
  {
    id: '2',
    driver: {
      name: 'Jane Smith',
      imageUrl: 'https://via.placeholder.com/100',
    },
    riders: [
      { id: '3', name: 'Carol Brown', imageUrl: 'https://via.placeholder.com/100' },
    ],
    schedule: {
      day: 'Tuesday',
      dropoff: '9:00 am',
      pickup: '5:30 pm',
    },
    pricePerWeek: 30,
    route: {
      pickup: '123 Home St',
      dropoff: '456 School Ave',
    },
  },
  {
    id: '3',
    driver: {
      name: 'Mike Johnson',
      imageUrl: 'https://via.placeholder.com/100',
    },
    riders: [
      { id: '4', name: 'David Lee', imageUrl: 'https://via.placeholder.com/100' },
      { id: '5', name: 'Emma White', imageUrl: 'https://via.placeholder.com/100' },
      { id: '6', name: 'Frank Miller', imageUrl: 'https://via.placeholder.com/100' },
    ],
    schedule: {
      day: 'Wednesday',
      dropoff: '8:00 am',
      pickup: '4:30 pm',
    },
    pricePerWeek: 35,
    route: {
      pickup: '123 Home St',
      dropoff: '456 School Ave',
    },
  },
  {
    id: '4',
    driver: {
      name: 'Sarah Wilson',
      imageUrl: 'https://via.placeholder.com/100',
    },
    riders: [
      { id: '7', name: 'George Davis', imageUrl: 'https://via.placeholder.com/100' },
      { id: '8', name: 'Helen Taylor', imageUrl: 'https://via.placeholder.com/100' },
    ],
    schedule: {
      day: 'Thursday',
      dropoff: '8:45 am',
      pickup: '5:15 pm',
    },
    pricePerWeek: 28,
    route: {
      pickup: '123 Home St',
      dropoff: '456 School Ave',
    },
  },
  {
    id: '5',
    driver: {
      name: 'David Brown',
      imageUrl: 'https://via.placeholder.com/100',
    },
    riders: [
      { id: '9', name: 'Ian Clark', imageUrl: 'https://via.placeholder.com/100' },
    ],
    schedule: {
      day: 'Friday',
      dropoff: '9:15 am',
      pickup: '5:45 pm',
    },
    pricePerWeek: 32,
    route: {
      pickup: '123 Home St',
      dropoff: '456 School Ave',
    },
  },
  {
    id: '6',
    driver: {
      name: 'Emily Davis',
      imageUrl: 'https://via.placeholder.com/100',
    },
    riders: [
      { id: '10', name: 'Jack Thompson', imageUrl: 'https://via.placeholder.com/100' },
      { id: '11', name: 'Karen Martin', imageUrl: 'https://via.placeholder.com/100' },
    ],
    schedule: {
      day: 'Monday',
      dropoff: '8:15 am',
      pickup: '4:45 pm',
    },
    pricePerWeek: 40,
    route: {
      pickup: '123 Home St',
      dropoff: '456 School Ave',
    },
  },
  {
    id: '7',
    driver: {
      name: 'Alex Turner',
      imageUrl: 'https://via.placeholder.com/100',
    },
    riders: [
      { id: '12', name: 'Lucy Adams', imageUrl: 'https://via.placeholder.com/100' },
      { id: '13', name: 'Mark Wilson', imageUrl: 'https://via.placeholder.com/100' },
      { id: '14', name: 'Nina Garcia', imageUrl: 'https://via.placeholder.com/100' },
    ],
    schedule: {
      day: 'Wednesday',
      dropoff: '9:30 am',
      pickup: '6:00 pm',
    },
    pricePerWeek: 22,
    route: {
      pickup: '123 Home St',
      dropoff: '456 School Ave',
    },
  },
];

export default function GroupsScreen() {
  const [groups, setGroups] = useState(GROUPS);

  const handleLeaveGroup = (groupId: string) => {
    setGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
  };

  const getSearchingDays = (riderCount: number) => {
    if (riderCount >= 3) return null;
    const days = Math.floor(Math.random() * 7) + 1;
    return `Searching for riders... (${days} ${days === 1 ? 'day' : 'days'})`;
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Your Ride Groups</ThemedText>
      <ScrollView style={styles.scrollView}>
        {groups.map((group) => (
          <View key={group.id} style={styles.groupCard}>
            <View style={styles.header}>
              <View style={styles.driverInfo}>
                <Image
                  source={{ uri: group.driver.imageUrl }}
                  style={styles.driverAvatar}
                />
                <View>
                  <Text style={styles.driverName}>{group.driver.name}</Text>
                  <Text style={styles.label}>Driver</Text>
                </View>
              </View>
              <Pressable 
                style={styles.leaveButton}
                onPress={() => handleLeaveGroup(group.id)}
              >
                <Text style={styles.leaveButtonText}>Leave Group</Text>
              </Pressable>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Schedule</Text>
              <Text style={styles.scheduleText}>
                {group.schedule.day}: {group.schedule.dropoff} - {group.schedule.pickup}
              </Text>
              <Text style={styles.durationText}>
                Ride duration: ~30 minutes
              </Text>
              {group.riders.length < 3 && (
                <Text style={styles.searchingText}>
                  {getSearchingDays(group.riders.length)}
                </Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Route</Text>
              <View style={styles.routeInfo}>
                <View style={styles.routePoint}>
                  <Ionicons name="location" size={16} color="#000000" />
                  <Text style={styles.routeText}>{group.route.pickup}</Text>
                </View>
                <View style={styles.routePoint}>
                  <Ionicons name="location" size={16} color="#000000" />
                  <Text style={styles.routeText}>{group.route.dropoff}</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Riders</Text>
              <View style={styles.ridersContainer}>
                {group.riders.map((rider) => (
                  <View key={rider.id} style={styles.riderInfo}>
                    <Image
                      source={{ uri: rider.imageUrl }}
                      style={styles.riderAvatar}
                    />
                    <Text style={styles.riderName}>{rider.name}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.price}>${group.pricePerWeek}/week</Text>
            </View>
          </View>
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
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  groupCard: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  label: {
    fontSize: 12,
    color: '#6b7280',
  },
  leaveButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#fee2e2',
  },
  leaveButtonText: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '500',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  scheduleText: {
    fontSize: 14,
    color: '#000000',
  },
  routeInfo: {
    gap: 8,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  routeText: {
    fontSize: 14,
    color: '#000000',
  },
  ridersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  riderInfo: {
    alignItems: 'center',
    width: 80,
  },
  riderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginBottom: 4,
  },
  riderName: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#e5e7eb',
    marginTop: 8,
    paddingTop: 12,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'right',
  },
  durationText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    fontStyle: 'italic',
  },
  searchingText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 8,
    fontStyle: 'italic',
  },
}); 
