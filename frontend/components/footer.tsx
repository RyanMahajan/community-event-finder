import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

interface FooterProps {
  activeTab: 'feed' | 'create' | 'events';
  onTabChange: (tab: 'feed' | 'create' | 'events') => void;
}

export default function Footer({ activeTab, onTabChange }: FooterProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.footer}>
        {/* Home Feed Tab */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onTabChange('feed')}
          activeOpacity={0.7}
        >
          <Text style={[styles.icon, activeTab === 'feed' && styles.activeIcon]}>
            🏠
          </Text>
        </TouchableOpacity>

        {/* Create Event Tab */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onTabChange('create')}
          activeOpacity={0.7}
        >
          <Text style={[styles.icon, activeTab === 'create' && styles.activeIcon]}>
            ➕
          </Text>
        </TouchableOpacity>

        {/* My Events Tab */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onTabChange('events')}
          activeOpacity={0.7}
        >
          <Text style={[styles.icon, activeTab === 'events' && styles.activeIcon]}>
            📋
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderTopWidth: 0,
    elevation: 0,
    shadowColor: 'transparent',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  icon: {
    fontSize: 28,
    opacity: 0.6,
    transition: 'opacity 0.2s ease',
  },
  activeIcon: {
    opacity: 1,
    fontSize: 32,
  },
});

