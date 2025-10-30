"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable, StatusBar } from "react-native"

interface HeaderProps {
  title?: string
}

export default function Header({ title = "My App" }: HeaderProps) {
  const [menuVisible, setMenuVisible] = useState(false)

  const menuItems = [
    { label: "Home", onPress: () => console.log("Home pressed") },
    { label: "About", onPress: () => console.log("About pressed") },
    { label: "Services", onPress: () => console.log("Services pressed") },
    { label: "Settings", onPress: () => console.log("Settings pressed") },
  ]

  const handleMenuItemPress = (onPress: () => void) => {
    setMenuVisible(false)
    onPress()
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton} activeOpacity={0.7}>
          <View style={styles.menuIcon}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>
        </TouchableOpacity>
      </View>

      <Modal visible={menuVisible} transparent={true} animationType="fade" onRequestClose={() => setMenuVisible(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.dropdown}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.menuItem, index === menuItems.length - 1 && styles.lastMenuItem]}
                onPress={() => handleMenuItemPress(item.onPress)}
                activeOpacity={0.7}
              >
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: (StatusBar.currentHeight || 0) + 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    justifyContent: "space-around",
  },
  menuLine: {
    width: 24,
    height: 2,
    backgroundColor: "#111827",
    borderRadius: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: (StatusBar.currentHeight || 0) + 60,
    paddingRight: 16,
  },
  dropdown: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    minWidth: 200,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemText: {
    fontSize: 16,
    color: "#374151",
  },
})

