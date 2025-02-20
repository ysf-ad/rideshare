import { StyleSheet, View, Text, Image, ScrollView, Pressable } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  // Mock data for demonstration
  const nextRide = {
    day: 'Monday',
    time: '8:30 AM',
    driver: {
      name: 'Tom Smith',
      imageUrl: 'https://via.placeholder.com/100',
    },
    pickup: '123 Home St',
    dropoff: '456 School Ave',
  };

  const groupStats = {
    totalGroups: 7,
    searchingGroups: 3,
  };

  const handleGroupsPress = () => {
    router.push('/(tabs)/groups');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={styles.greeting}>
          <ThemedText style={styles.greetingText}>Hello, John.</ThemedText>
        </View>

        <View style={styles.section}>
          <ThemedText type="title" style={styles.sectionTitle}>Next Ride</ThemedText>
          <View style={styles.nextRideCard}>
            <View style={styles.driverInfo}>
              <Image
                source={{ uri: nextRide.driver.imageUrl }}
                style={styles.driverAvatar}
              />
              <View>
                <Text style={styles.driverName}>{nextRide.driver.name}</Text>
                <Text style={styles.label}>Driver</Text>
              </View>
            </View>
            
            <View style={styles.rideDetails}>
              <View style={styles.timeInfo}>
                <Ionicons name="calendar-outline" size={20} color="#000000" />
                <Text style={styles.timeText}>{nextRide.day} at {nextRide.time}</Text>
              </View>
              
              <View style={styles.routeInfo}>
                <View style={styles.routePoint}>
                  <Ionicons name="location-outline" size={20} color="#000000" />
                  <Text style={styles.routeText}>{nextRide.pickup}</Text>
                </View>
                <View style={styles.routeArrow}>
                  <Ionicons name="arrow-down" size={16} color="#6b7280" />
                </View>
                <View style={styles.routePoint}>
                  <Ionicons name="location-outline" size={20} color="#000000" />
                  <Text style={styles.routeText}>{nextRide.dropoff}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <Pressable onPress={handleGroupsPress}>
          <View style={styles.section}>
            <ThemedText type="title" style={styles.sectionTitle}>Your Groups</ThemedText>
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{groupStats.totalGroups}</Text>
                <Text style={styles.statLabel}>Total Groups</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{groupStats.searchingGroups}</Text>
                <Text style={styles.statLabel}>Groups Looking for Riders</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="title" style={styles.sectionTitle}>Groups Status</ThemedText>
            <View style={styles.searchingGroupsCard}>
              <Ionicons name="search-outline" size={24} color="#6b7280" style={styles.searchIcon} />
              <Text style={styles.searchingText}>
                {groupStats.searchingGroups} of your groups are currently looking for additional riders
              </Text>
            </View>
          </View>
        </Pressable>
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
  greeting: {
    marginBottom: 24,
    marginTop: 12,
  },
  greetingText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: -1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  nextRideCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
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
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
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
  rideDetails: {
    gap: 16,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
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
  routeArrow: {
    paddingLeft: 28,
  },
  routeText: {
    fontSize: 14,
    color: '#000000',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  searchingGroupsCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchIcon: {
    marginRight: 4,
  },
  searchingText: {
    flex: 1,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
});
