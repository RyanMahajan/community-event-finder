"use client"

import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface HeaderProps {
  buttons?: Array<{
    label: string
    onPress: () => void
    variant?: "primary" | "secondary"
  }>
}

export default function Header({ buttons = [] }: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>text</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    margin: 10,
  },
  header: {
    backgroundColor: '#cccccc',
    borderRadius: 20
  }
});
