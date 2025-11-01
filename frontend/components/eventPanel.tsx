import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

interface EventPanelProps {
  imageUrl: ImageSourcePropType | string;
  title: string;
  description: string;
  postedBy: {
    name: string;
    avatar?: string;
  };
  heatScore: number; // 0-100 representing popularity
  onAddEvent?: () => void;
}

export default function EventPanel({
  imageUrl,
  title,
  description,
  postedBy,
  heatScore,
  onAddEvent,
}: EventPanelProps) {
  // Generate heat meter colors based on score
  const getHeatColor = (score: number) => {
    if (score < 25) return '#3b82f6'; // Blue
    if (score < 50) return '#10b981'; // Green
    if (score < 75) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  const renderHeatMeter = () => {
    const segments = 5;
    const filledSegments = Math.ceil((heatScore / 100) * segments);

    return (
      <View style={styles.heatMeter}>
        {Array.from({ length: segments }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.heatSegment,
              {
                backgroundColor:
                  index < filledSegments
                    ? getHeatColor(heatScore)
                    : '#e5e7eb',
              },
            ]}
          />
        ))}
        <Text style={styles.heatText}>{heatScore}%</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Background Image - Full Screen */}
      <Image
        source={imageUrl}
        style={styles.backgroundImage}
        resizeMode="contain"
      />

      {/* Left Side Content - Overlayed with Blur Background */}
      <View style={styles.leftContent}>
        {/* Blurred background for text readability */}
        <BlurView intensity={90} style={styles.blurContainer}>
          {/* Title */}
          <Text style={styles.title} numberOfLines={3}>
            {title}
          </Text>

          {/* Description */}
          <Text style={styles.description} numberOfLines={4}>
            {description}
          </Text>

          {/* Posted By Group */}
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
        </BlurView>
      </View>

      {/* Right Side - Add Button and Heat Meter */}
      <View style={styles.rightContent}>
        {/* Add Event Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={onAddEvent}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

        {/* Heat Meter */}
        <View style={styles.heatMeterContainer}>
          {renderHeatMeter()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'hidden',
    width: screenWidth,
    height: screenHeight,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  leftContent: {
    position: 'absolute',
    left: 0,
    bottom: screenHeight * 0.15, // Account for footer
    width: screenWidth * 0.65,
    paddingHorizontal: screenWidth * 0.04,
    paddingBottom: screenHeight * 0.03,
    maxHeight: screenHeight * 0.5,
  },
  blurContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    padding: screenWidth * 0.04,
  },
  title: {
    fontSize: screenWidth * 0.06,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: screenHeight * 0.015,
    lineHeight: screenWidth * 0.08,
  },
  description: {
    fontSize: screenWidth * 0.032,
    color: '#ffffff',
    lineHeight: screenWidth * 0.045,
    marginBottom: screenHeight * 0.02,
  },
  postedByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: screenHeight * 0.01,
  },
  avatar: {
    width: screenWidth * 0.09,
    height: screenWidth * 0.09,
    borderRadius: screenWidth * 0.045,
    marginRight: screenWidth * 0.025,
  },
  avatarPlaceholder: {
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: screenWidth * 0.04,
    fontWeight: '700',
  },
  postedByText: {
    fontSize: screenWidth * 0.032,
    color: '#ffffff',
    fontWeight: '600',
    flex: 1,
  },
  rightContent: {
    position: 'absolute',
    right: 0,
    bottom: screenHeight * 0.15, // Account for footer
    alignItems: 'center',
    paddingHorizontal: screenWidth * 0.04,
    height: screenHeight * 0.4,
    width: screenWidth * 0.2,
    justifyContent: 'space-around',
  },
  addButton: {
    width: screenWidth * 0.14,
    height: screenWidth * 0.14,
    borderRadius: screenWidth * 0.07,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  addButtonText: {
    fontSize: screenWidth * 0.1,
    fontWeight: '300',
    color: '#000',
    lineHeight: screenWidth * 0.1,
  },
  heatMeterContainer: {
    alignItems: 'center',
  },
  heatMeter: {
    alignItems: 'center',
    gap: screenHeight * 0.015,
  },
  heatSegment: {
    width: screenWidth * 0.08,
    height: screenHeight * 0.008,
    borderRadius: screenHeight * 0.004,
  },
  heatText: {
    fontSize: screenWidth * 0.03,
    fontWeight: '600',
    color: '#ffffff',
    marginTop: screenHeight * 0.01,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
