import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams, router } from 'expo-router';

export default function ConfirmScheduleScreen() {
  const params = useLocalSearchParams<{ scheduleData: string }>();
  const { flexibility, ...scheduleData } = params.scheduleData ? JSON.parse(params.scheduleData) : {};

  const handleConfirm = () => {
    // Navigate to explore page after confirmation
    router.replace('/explore');
  };

  const formatDay = (day: string) => {
    if (day === 'All Weekdays') return day;
    return day;
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Confirm Your Schedule</ThemedText>
      <ThemedText style={styles.flexibilityText}>Flexibility: ±{flexibility || 0}m</ThemedText>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.scheduleContainer}>
          {Object.entries(scheduleData).map(([day, data]: [string, any]) => {
            if (!data || day === 'All Weekdays' || day === 'flexibility') return null;
            return (
              <View key={day} style={styles.dayContainer}>
                <ThemedText style={styles.dayTitle}>{formatDay(day)}</ThemedText>
                {data && (
                  <View style={styles.timesContainer}>
                    <View style={styles.timeBlock}>
                      <ThemedText style={styles.timeLabel}>Dropoff</ThemedText>
                      <ThemedText style={styles.timeValue}>{data.dropoff}</ThemedText>
                    </View>
                    <View style={styles.timeBlock}>
                      <ThemedText style={styles.timeLabel}>Pickup</ThemedText>
                      <ThemedText style={styles.timeValue}>{data.pickup}</ThemedText>
                    </View>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Pressable 
          style={styles.confirmButton}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmButtonText}>Confirm Schedule</Text>
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
  },
  flexibilityText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  scheduleContainer: {
    gap: 16,
  },
  dayContainer: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
  timesContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  timeBlock: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
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
}); 