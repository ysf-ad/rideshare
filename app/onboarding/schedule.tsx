import { StyleSheet, View, Text, PanResponder, Animated, ScrollView, Dimensions, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState, useRef, useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Slider from '@react-native-community/slider';

type TimeData = {
  [key: string]: { dropoff: string; pickup: string; dropoffPosition: number; pickupPosition: number } | null;
};

const BASE_HOUR_HEIGHT = 60;
const MIN_HOUR_HEIGHT = 20;
const CONTAINER_PADDING = 40;
const PICKER_HEIGHT = 90;
const TITLE_HEIGHT = 40;
const DAYS_ROW_HEIGHT = 34;
const TOTAL_HEIGHT = BASE_HOUR_HEIGHT * 24;
const DEFAULT_START_HOUR = 8;
const DEFAULT_END_HOUR = 20;
const VISIBLE_HOURS = DEFAULT_END_HOUR - DEFAULT_START_HOUR;
const SCROLL_THRESHOLD = 50;
const SCROLL_SPEED = 5;
const HEADER_HEIGHT = 180;
const SCROLL_MARGIN = BASE_HOUR_HEIGHT;
const VISIBLE_HEIGHT = BASE_HOUR_HEIGHT * (VISIBLE_HOURS + 1);
const SCROLL_BAR_WIDTH = 20;

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const WEEKDAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState('All Weekdays');
  const [visibleRange, setVisibleRange] = useState({
    start: DEFAULT_START_HOUR,
    end: DEFAULT_END_HOUR
  });
  const [smoothVisibleRange, setSmoothVisibleRange] = useState({
    start: DEFAULT_START_HOUR,
    end: DEFAULT_END_HOUR
  });
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollOffset = useRef(0);
  const isDragging = useRef(false);
  const activeHandle = useRef<{ isDropoff: boolean; startY: number; startPosition: number } | null>(null);
  const [flexibility, setFlexibility] = useState(0);
  
  const [timeData, setTimeData] = useState<TimeData>({
    'All Weekdays': { dropoff: '09:00', pickup: '17:00', dropoffPosition: 9 * BASE_HOUR_HEIGHT, pickupPosition: 17 * BASE_HOUR_HEIGHT },
    'Monday': { dropoff: '09:00', pickup: '17:00', dropoffPosition: 9 * BASE_HOUR_HEIGHT, pickupPosition: 17 * BASE_HOUR_HEIGHT },
    'Tuesday': { dropoff: '09:00', pickup: '17:00', dropoffPosition: 9 * BASE_HOUR_HEIGHT, pickupPosition: 17 * BASE_HOUR_HEIGHT },
    'Wednesday': { dropoff: '09:00', pickup: '17:00', dropoffPosition: 9 * BASE_HOUR_HEIGHT, pickupPosition: 17 * BASE_HOUR_HEIGHT },
    'Thursday': { dropoff: '09:00', pickup: '17:00', dropoffPosition: 9 * BASE_HOUR_HEIGHT, pickupPosition: 17 * BASE_HOUR_HEIGHT },
    'Friday': { dropoff: '09:00', pickup: '17:00', dropoffPosition: 9 * BASE_HOUR_HEIGHT, pickupPosition: 17 * BASE_HOUR_HEIGHT },
    'Saturday': null,
    'Sunday': null,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSmoothVisibleRange(visibleRange);
    }, 100);
    return () => clearTimeout(timer);
  }, [visibleRange]);

  const handleDeleteOrAdd = () => {
    setTimeData(prev => {
      const newData = { ...prev };
      if (isTimeSlotDeleted()) {
        if (selectedDay === 'All Weekdays') {
          newData['All Weekdays'] = {
            dropoff: '09:00',
            pickup: '17:00',
            dropoffPosition: 9 * BASE_HOUR_HEIGHT,
            pickupPosition: 17 * BASE_HOUR_HEIGHT
          };
          WEEKDAYS.forEach(day => {
            if (day !== 'Saturday' && day !== 'Sunday') {
              newData[day] = {
                dropoff: '09:00',
                pickup: '17:00',
                dropoffPosition: 9 * BASE_HOUR_HEIGHT,
                pickupPosition: 17 * BASE_HOUR_HEIGHT
              };
            }
          });
        } else {
          newData[selectedDay] = {
            dropoff: '09:00',
            pickup: '17:00',
            dropoffPosition: 9 * BASE_HOUR_HEIGHT,
            pickupPosition: 17 * BASE_HOUR_HEIGHT
          };
        }
      } else {
        if (selectedDay === 'All Weekdays') {
          newData['All Weekdays'] = null;
          Object.keys(newData).forEach(day => {
            if (day === 'Saturday' || day === 'Sunday') {
              newData[day] = null;
            } else {
              newData[day] = null;
            }
          });
        } else {
          newData[selectedDay] = null;
        }
      }
      return newData;
    });
    updateVisibleRange();
  };

  const updateVisibleRange = () => {
    let minTime = 24;
    let maxTime = 0;
    let hasValidTimes = false;

    Object.values(timeData).forEach((data) => {
      if (data) {
        const dropoffHour = Math.floor(data.dropoffPosition / BASE_HOUR_HEIGHT);
        const pickupHour = Math.floor(data.pickupPosition / BASE_HOUR_HEIGHT);
        const flexibilityHours = flexibility / 60;
        
        minTime = Math.min(minTime, dropoffHour - flexibilityHours, pickupHour - flexibilityHours);
        maxTime = Math.max(maxTime, dropoffHour + flexibilityHours, pickupHour + flexibilityHours);
        hasValidTimes = true;
      }
    });

    if (!hasValidTimes) {
      setVisibleRange({ start: DEFAULT_START_HOUR, end: DEFAULT_END_HOUR });
      return;
    }

    const range = maxTime - minTime;
    const padding = range < 4 ? 2 : 1;

    minTime = Math.max(0, Math.floor(minTime - padding));
    maxTime = Math.min(23, Math.ceil(maxTime + padding));

    setVisibleRange({ start: minTime, end: maxTime });
  };

  const getPositionFromTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours + minutes / 60) * BASE_HOUR_HEIGHT;
  };

  const snapToGrid = (position: number) => {
    const normalizedPosition = (position / BASE_HOUR_HEIGHT) * BASE_HOUR_HEIGHT;
    const step = Math.round(normalizedPosition / (BASE_HOUR_HEIGHT / 4)) * (BASE_HOUR_HEIGHT / 4);
    return Math.max(0, Math.min(step, 23.75 * BASE_HOUR_HEIGHT));
  };

  const getTimeFromPosition = (position: number) => {
    const normalizedPosition = (position / BASE_HOUR_HEIGHT) * BASE_HOUR_HEIGHT;
    const totalHours = normalizedPosition / BASE_HOUR_HEIGHT;
    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60 / 15) * 15;
    
    if (hours === 24) {
      return '23:45';
    }
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const updateTime = (position: number, isDropoff: boolean) => {
    const snappedPosition = snapToGrid(position);
    const time = getTimeFromPosition(snappedPosition);
    
    setTimeData(prev => {
      const newData = { ...prev };
      if (selectedDay === 'All Weekdays') {
        if (!newData['All Weekdays']) {
          newData['All Weekdays'] = {
            dropoff: '09:00',
            pickup: '17:00',
            dropoffPosition: 9 * BASE_HOUR_HEIGHT,
            pickupPosition: 17 * BASE_HOUR_HEIGHT
          };
        }
        if (isDropoff) {
          newData['All Weekdays']!.dropoff = time;
          newData['All Weekdays']!.dropoffPosition = getPositionFromTime(time);
        } else {
          newData['All Weekdays']!.pickup = time;
          newData['All Weekdays']!.pickupPosition = getPositionFromTime(time);
        }

        Object.keys(newData).forEach(day => {
          if (day === 'Saturday' || day === 'Sunday' || day === 'All Weekdays') return;
          
          if (!newData[day]) {
            newData[day] = {
              dropoff: '09:00',
              pickup: '17:00',
              dropoffPosition: 9 * BASE_HOUR_HEIGHT,
              pickupPosition: 17 * BASE_HOUR_HEIGHT
            };
          }
          
          if (isDropoff) {
            newData[day]!.dropoff = time;
            newData[day]!.dropoffPosition = getPositionFromTime(time);
          } else {
            newData[day]!.pickup = time;
            newData[day]!.pickupPosition = getPositionFromTime(time);
          }
        });
      } else {
        if (!newData[selectedDay]) {
          newData[selectedDay] = {
            dropoff: '09:00',
            pickup: '17:00',
            dropoffPosition: 9 * BASE_HOUR_HEIGHT,
            pickupPosition: 17 * BASE_HOUR_HEIGHT
          };
        }
        
        if (isDropoff) {
          newData[selectedDay]!.dropoff = time;
          newData[selectedDay]!.dropoffPosition = getPositionFromTime(time);
        } else {
          newData[selectedDay]!.pickup = time;
          newData[selectedDay]!.pickupPosition = getPositionFromTime(time);
        }
      }

      let minTime = 24;
      let maxTime = 0;
      let hasValidTimes = false;
      
      Object.values(newData).forEach((data) => {
        if (data) {
          const dropoffHour = Math.floor(data.dropoffPosition / BASE_HOUR_HEIGHT);
          const pickupHour = Math.floor(data.pickupPosition / BASE_HOUR_HEIGHT);
          minTime = Math.min(minTime, dropoffHour, pickupHour);
          maxTime = Math.max(maxTime, dropoffHour, pickupHour);
          hasValidTimes = true;
        }
      });

      if (!hasValidTimes) {
        setVisibleRange({ start: DEFAULT_START_HOUR, end: DEFAULT_END_HOUR });
        return newData;
      }

      const range = maxTime - minTime;
      const padding = range < 4 ? 2 : 1;
      
      minTime = Math.max(0, minTime - padding);
      maxTime = Math.min(23, maxTime + padding);
      
      setVisibleRange({ start: minTime, end: maxTime });
      return newData;
    });
  };

  const calculateHourHeight = () => {
    const availableHeight = Dimensions.get('window').height - CONTAINER_PADDING - PICKER_HEIGHT - TITLE_HEIGHT - DAYS_ROW_HEIGHT - 60;
    const hoursInRange = smoothVisibleRange.end - smoothVisibleRange.start + 1;
    const calculatedHeight = Math.floor((availableHeight * 0.8) / hoursInRange);
    return Math.max(MIN_HOUR_HEIGHT, Math.min(BASE_HOUR_HEIGHT, calculatedHeight));
  };

  const hourHeight = calculateHourHeight();

  const createPanResponder = (isDropoff: boolean) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        const currentData = timeData[selectedDay];
        if (!currentData) return;

        isDragging.current = true;
        const currentPosition = isDropoff 
          ? currentData.dropoffPosition 
          : currentData.pickupPosition;
        activeHandle.current = {
          isDropoff,
          startY: gestureState.y0,
          startPosition: currentPosition
        };
      },
      onPanResponderMove: (_, gestureState) => {
        if (!activeHandle.current) return;
        
        const deltaY = gestureState.moveY - activeHandle.current.startY;
        const newPosition = activeHandle.current.startPosition + deltaY;
        const adjustedPosition = Math.max(0, Math.min(TOTAL_HEIGHT, newPosition));
        
        updateTime(adjustedPosition, activeHandle.current.isDropoff);
      },
      onPanResponderRelease: () => {
        isDragging.current = false;
        activeHandle.current = null;
      },
      onPanResponderTerminate: () => {
        isDragging.current = false;
        activeHandle.current = null;
      },
    });

  const dropoffResponder = createPanResponder(true);
  const pickupResponder = createPanResponder(false);

  const visibleTimes = Array.from(
    { length: 24 }, 
    (_, i) => i
  );

  const getVisibleTimeLabels = () => {
    if (hourHeight >= 45) {
      return visibleTimes;
    } else if (hourHeight >= 35) {
      return visibleTimes.filter(hour => hour % 2 === 0);
    } else if (hourHeight >= 25) {
      return visibleTimes.filter(hour => hour % 3 === 0);
    } else {
      return visibleTimes.filter(hour => hour % 4 === 0);
    }
  };

  const visibleTimeLabels = getVisibleTimeLabels();

  const isTimeSlotDeleted = () => {
    if (selectedDay === 'All Weekdays') {
      return WEEKDAYS.every(day => 
        day === 'Saturday' || day === 'Sunday' || !timeData[day]
      );
    }
    return !timeData[selectedDay];
  };

  const handleContinue = () => {
    const filteredData = Object.fromEntries(
      Object.entries(timeData).filter(([day, data]) => data && day !== 'All Weekdays')
    );
    router.push({
      pathname: "/confirm-schedule",
      params: { scheduleData: JSON.stringify({
        ...filteredData,
        flexibility: flexibility
      }) }
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Set your schedule</ThemedText>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedDay}
          style={styles.picker}
          onValueChange={(itemValue: string) => setSelectedDay(itemValue)}
        >
          <Picker.Item label="All Weekdays" value="All Weekdays" />
          {WEEKDAYS.map((day) => (
            <Picker.Item key={day} label={day} value={day} />
          ))}
        </Picker>
        <Pressable 
          onPress={handleDeleteOrAdd}
          style={styles.deleteButton}
        >
          {isTimeSlotDeleted() ? (
            <Ionicons name="add" size={24} color="#16a34a" />
          ) : (
            <Ionicons name="trash-outline" size={22} color="#ef4444" />
          )}
        </Pressable>
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView 
          ref={scrollViewRef}
          style={styles.calendarContainer}
          contentContainerStyle={[
            styles.calendarContent,
            { 
              height: hourHeight * (smoothVisibleRange.end - smoothVisibleRange.start + 1),
              paddingBottom: hourHeight * 0.25
            }
          ]}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.daysRow}>
            <View style={styles.timeScaleHeader} />
            <View style={styles.daysContainer}>
              {WEEKDAYS_SHORT.map((day, index) => (
                <View key={day} style={[styles.dayLabelContainer, index > 0 && styles.dayLabelBorder]}>
                  <Text style={styles.day}>{day}</Text>
                </View>
              ))}
            </View>
            <View style={styles.scrollBarSpacer} />
          </View>
          <View style={styles.timeSlots}>
            <View style={styles.timeScaleContainer}>
              <View style={styles.timeScale}>
                {visibleTimeLabels.map((hour) => {
                  const top = (hour - smoothVisibleRange.start) * hourHeight;
                  if (hour >= smoothVisibleRange.start && hour <= smoothVisibleRange.end) {
                    return (
                      <View 
                        key={hour} 
                        style={[
                          styles.timeLabelContainer, 
                          { 
                            position: 'absolute',
                            top,
                            height: hourHeight 
                          }
                        ]}
                      >
                        <Text style={[
                          styles.timeLabel,
                          { fontSize: hourHeight < 30 ? 9 : 11 }
                        ]}>
                          {`${hour.toString().padStart(2, '0')}:00`}
                        </Text>
                      </View>
                    );
                  }
                  return null;
                })}
              </View>
              {Object.entries(timeData).map(([day, data]) => {
                if (!data || (selectedDay !== 'All Weekdays' && selectedDay !== day)) {
                  return null;
                }
                return (
                  <React.Fragment key={day}>
                    <View
                      {...dropoffResponder.panHandlers}
                      style={[
                        styles.handle, 
                        { 
                          top: (data.dropoffPosition / BASE_HOUR_HEIGHT) * hourHeight - (smoothVisibleRange.start * hourHeight) - 12,
                          backgroundColor: '#000000'
                        }
                      ]}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text style={styles.handleText}>{data.dropoff}</Text>
                    </View>
                    <View
                      {...pickupResponder.panHandlers}
                      style={[
                        styles.handle, 
                        { 
                          top: (data.pickupPosition / BASE_HOUR_HEIGHT) * hourHeight - (smoothVisibleRange.start * hourHeight) - 12,
                          backgroundColor: '#000000'
                        }
                      ]}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <Text style={styles.handleText}>{data.pickup}</Text>
                    </View>
                  </React.Fragment>
                );
              })}
            </View>
            <View style={styles.daySegments}>
              {WEEKDAYS_SHORT.map((day, index) => {
                const fullDay = WEEKDAYS[index];
                const dayData = timeData[fullDay];
                return (
                  <View key={day} style={[
                    styles.daySegment, 
                    { height: hourHeight * (smoothVisibleRange.end - smoothVisibleRange.start + 1) }
                  ]}>
                    {dayData && (
                      <>
                        <View style={[
                          styles.timeLine,
                          {
                            top: ((dayData.dropoffPosition / BASE_HOUR_HEIGHT) * hourHeight) - (smoothVisibleRange.start * hourHeight),
                            height: Math.max(2, (flexibility / 30) * hourHeight),
                            transform: [{ translateY: -((flexibility / 30) * hourHeight) / 2 }],
                            backgroundColor: '#000000',
                            opacity: 0.15,
                          }
                        ]} />
                        <View style={[
                          styles.timeLine, 
                          { 
                            top: ((dayData.pickupPosition / BASE_HOUR_HEIGHT) * hourHeight) - (smoothVisibleRange.start * hourHeight),
                            height: Math.max(2, (flexibility / 30) * hourHeight),
                            transform: [{ translateY: -((flexibility / 30) * hourHeight) / 2 }],
                            backgroundColor: '#000000',
                            opacity: 0.15,
                          }
                        ]} />
                      </>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.flexibilityContainer}>
        <View style={styles.flexibilityHeader}>
          <ThemedText style={styles.flexibilityTitle}>Flexibility</ThemedText>
          <ThemedText style={styles.flexibilityValue}>
            {Math.round(flexibility)} {flexibility === 1 ? 'minute' : 'minutes'}
          </ThemedText>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={60}
          step={5}
          value={flexibility}
          onValueChange={setFlexibility}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#e5e7eb"
          thumbTintColor="#000000"
        />
        <View style={styles.flexibilityLabels}>
          <ThemedText style={styles.flexibilityLabel}>0 min</ThemedText>
          <ThemedText style={styles.flexibilityLabel}>60 min</ThemedText>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 10,
  },
  picker: {
    height: 50,
    flex: 1,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    flex: 1,
    position: 'relative',
  },
  calendarContainer: {
    flex: 1,
  },
  daysRow: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingRight: SCROLL_BAR_WIDTH,
  },
  daysContainer: {
    flex: 1,
    flexDirection: 'row',
    marginRight: -1,
    paddingHorizontal: 8,
  },
  dayLabelContainer: {
    flex: 1,
    alignItems: 'center',
    height: 24,
    justifyContent: 'center',
    paddingHorizontal: 8,
    minWidth: 45,
  },
  dayLabelBorder: {
    borderLeftWidth: 1,
    borderColor: '#e5e7eb',
    marginLeft: 4,
  },
  timeScaleHeader: {
    width: 50,
  },
  day: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
  },
  timeSlots: {
    flexDirection: 'row',
  },
  timeScaleContainer: {
    width: 50,
    position: 'relative',
  },
  timeScale: {
    width: 50,
    position: 'relative',
    height: '100%',
  },
  timeLabelContainer: {
    width: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeLabel: {
    textAlign: 'center',
    color: '#666666',
  },
  timeMarkContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  timeMark: {
    position: 'absolute',
    left: 20,
    width: 10,
    height: 1,
    backgroundColor: '#9ca3af',
  },
  daySegments: {
    flex: 1,
    flexDirection: 'row',
  },
  daySegment: {
    flex: 1,
    borderLeftWidth: 1,
    borderColor: '#e5e7eb',
    position: 'relative',
  },
  handle: {
    position: 'absolute',
    width: 60,
    height: 24,
    backgroundColor: '#000000',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    left: -5,
  },
  handleText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  timeLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#000000',
    opacity: 0.15,
  },
  calendarContent: {
    paddingBottom: 20,
  },
  scrollBarSpacer: {
    width: SCROLL_BAR_WIDTH,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingTop: 20,
  },
  uploadButton: {
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000000',
  },
  uploadButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
  },
  continueButton: {
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  flexibilityContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  flexibilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  flexibilityTitle: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  flexibilityValue: {
    fontSize: 14,
    color: '#6b7280',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  flexibilityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
  },
  flexibilityLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
}); 
