import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  postedBy: {
    name: string;
    avatar?: string;
  };
  attendeeCount: number;
  onPress?: () => void;
}

export default function Card({
  imageUrl,
  title,
  description,
  postedBy,
  attendeeCount,
  onPress,
}: CardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Event Poster Image */}
      <Image
        source={{ uri: imageUrl }}
        style={styles.posterImage}
	resizeMode="cover"
      />

      {/* Content Container */}
      <View style={styles.contentContainer}>
        {/* Event Title */}
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        {/* Event Description */}
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>

        {/* Footer with User Info and Attendee Count */}
        <View style={styles.footer}>
          {/* Posted By */}
          <View style={styles.postedByContainer}>
            {postedBy.avatar ? (
              <Image
                source={{ uri: postedBy.avatar }}
                style={styles.avatar}
              />
            ) : (
              <View style={[styles.avatar, styles.avatarPlaceholder]}>
                <Text style={styles.avatarText}>
                  {postedBy.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <Text style={styles.postedByText} numberOfLines={1}>
              {postedBy.name}
            </Text>
          </View>

          {/* Attendee Count */}
          <View style={styles.attendeeContainer}>
            <Text style={styles.attendeeIcon}>👥</Text>
            <Text style={styles.attendeeCount}>
              {attendeeCount} going
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  posterImage: {
    width: '100%',
    height: screenWidth * (5 / 4), // 4:5 ratio (height = width * 1.25)
    backgroundColor: '#f0f0f0',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    lineHeight: 26,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  postedByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  avatarPlaceholder: {
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  postedByText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
    flex: 1,
  },
  attendeeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  attendeeIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  attendeeCount: {
    fontSize: 13,
    color: '#333333',
    fontWeight: '600',
  },
});
