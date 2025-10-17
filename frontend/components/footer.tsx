"use client"

import React from 'react'
import { View, StyleSheet } from 'react-native'

interface FooterProps {
  buttons?: Array<{
    label: string
    onPress: () => void
    variant?: "primary" | "secondary"
  }>
}

export default function Footer({ buttons = [] }: FooterProps) {
  return (
    <View style={styles.container}>
      <View style={styles.footer}>

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
  footer: {
    
  }

});