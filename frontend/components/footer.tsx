import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"

interface FooterProps {
  activeTab: "feed" | "create" | "events"
  onTabChange: (tab: "feed" | "create" | "events") => void
}

export default function Footer({ activeTab, onTabChange }: FooterProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.footer}>
        {/* Event Feed Tab */}
        <TouchableOpacity style={styles.tab} onPress={() => onTabChange("feed")} activeOpacity={0.7}>
          <View style={styles.iconContainer}>
            <View style={[styles.icon, activeTab === "feed" && styles.activeIcon]}>
              <View style={styles.feedIcon}>
                <View style={styles.feedLine} />
                <View style={styles.feedLine} />
                <View style={styles.feedLine} />
              </View>
            </View>
          </View>
          <Text style={[styles.label, activeTab === "feed" && styles.activeLabel]}>Feed</Text>
        </TouchableOpacity>

        {/* Create Event Tab */}
        <TouchableOpacity style={styles.tab} onPress={() => onTabChange("create")} activeOpacity={0.7}>
          <View style={styles.iconContainer}>
            <View style={[styles.icon, styles.createIcon, activeTab === "create" && styles.activeCreateIcon]}>
              <View style={styles.plusHorizontal} />
              <View style={styles.plusVertical} />
            </View>
          </View>
          <Text style={[styles.label, activeTab === "create" && styles.activeLabel]}>Create</Text>
        </TouchableOpacity>

        {/* Signed Up Events Tab */}
        <TouchableOpacity style={styles.tab} onPress={() => onTabChange("events")} activeOpacity={0.7}>
          <View style={styles.iconContainer}>
            <View style={[styles.icon, activeTab === "events" && styles.activeIcon]}>
              <View style={styles.checkmarkIcon}>
                <View style={styles.checkmark} />
              </View>
            </View>
          </View>
          <Text style={[styles.label, activeTab === "events" && styles.activeLabel]}>My Events</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },
  iconContainer: {
    marginBottom: 4,
  },
  icon: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  activeIcon: {
    opacity: 1,
  },
  // Feed Icon (three horizontal lines)
  feedIcon: {
    width: 24,
    height: 24,
    justifyContent: "space-around",
    paddingVertical: 4,
  },
  feedLine: {
    width: 24,
    height: 2,
    backgroundColor: "#666",
    borderRadius: 1,
  },
  // Create Icon (plus sign in circle)
  createIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#666",
    backgroundColor: "transparent",
  },
  activeCreateIcon: {
    borderColor: "#000",
    backgroundColor: "#000",
  },
  plusHorizontal: {
    position: "absolute",
    width: 16,
    height: 2,
    backgroundColor: "#666",
    borderRadius: 1,
  },
  plusVertical: {
    position: "absolute",
    width: 2,
    height: 16,
    backgroundColor: "#666",
    borderRadius: 1,
  },
  // Checkmark Icon
  checkmarkIcon: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#666",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    width: 6,
    height: 12,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: "#666",
    transform: [{ rotate: "45deg" }, { translateY: -2 }],
  },
  label: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
  },
  activeLabel: {
    color: "#000",
    fontWeight: "600",
  },
})

