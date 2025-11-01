import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import EventPanel from '../components/eventPanel';
import Header from '../components/header';
import Footer from '../components/footer';

const { height, width } = Dimensions.get('window');

interface Event {
  id: string;
  imageUrl: any;
  title: string;
  description: string;
  postedBy: {
    name: string;
    avatar?: string;
  };
  heatScore: number;
}

const EVENTS: Event[] = [
  {
    id: '1',
    imageUrl: require('../assets/images/poster2.png'),
    title: 'Flappy Bird Workshop',
    description:
      'Build your own version of Flappy Bird with the Mercer Game Dev team!',
    postedBy: {
      name: 'Mercer Game Dev',
      avatar: 'https://example.com/avatar.jpg',
    },
    heatScore: 85,
  },
  {
    id: '2',
    imageUrl: require('../assets/images/poster1.png'),
    title: 'Summer Music Festival 2025',
    description:
      'Join us for an unforgettable evening of live music, food, and entertainment under the stars!',
    postedBy: {
      name: 'Music Lovers Group',
      avatar: 'https://example.com/avatar.jpg',
    },
    heatScore: 92,
  },
  {
    id: '3',
    imageUrl: require('../assets/images/poster1.png'),
    title: 'Tech Startup Meetup',
    description:
      'Network with founders and investors in the tech startup ecosystem.',
    postedBy: {
      name: 'Tech Community Hub',
      avatar: 'https://example.com/avatar.jpg',
    },
    heatScore: 65,
  },
  {
    id: '4',
    imageUrl: require('../assets/images/poster1.png'),
    title: 'Yoga and Wellness Night',
    description:
      'Relax and rejuvenate with our community wellness session under the evening sky.',
    postedBy: {
      name: 'Wellness Warriors',
      avatar: 'https://example.com/avatar.jpg',
    },
    heatScore: 72,
  },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<'feed' | 'create' | 'events'>(
    'feed'
  );
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / height);
    setCurrentEventIndex(index);
  };

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / height);

    scrollViewRef.current?.scrollTo({
      y: index * height,
      animated: true,
    });
    setCurrentEventIndex(index);
  };

  const handleAddEvent = () => {
    console.log('Add event pressed for:', EVENTS[currentEventIndex].title);
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  return (
    <View style={styles.container}>
      {/* Header - Overlay */}
      <Header
        userName="Amra"
        onProfilePress={handleProfilePress}
        onSearch={handleSearch}
      />

      {/* Event Panels with Snap Scrolling */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        pagingEnabled={true}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        showsVerticalScrollIndicator={false}
        scrollEnabled={activeTab === 'feed'}
      >
        {EVENTS.map((event) => (
          <View key={event.id} style={styles.eventContainer}>
            <EventPanel
              imageUrl={event.imageUrl}
              title={event.title}
              description={event.description}
              postedBy={event.postedBy}
              heatScore={event.heatScore}
              onAddEvent={handleAddEvent}
            />
          </View>
        ))}
      </ScrollView>

      {/* Footer */}
      <Footer activeTab={activeTab} onTabChange={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  eventContainer: {
    height: height,
    width: width,
  },
});
