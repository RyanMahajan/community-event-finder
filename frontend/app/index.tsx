import React from "react";
import { Text, View, ScrollView } from "react-native";
import Card from "../components/card"
import Footer from "../components/footer"
import Header from "../components/header"


export default function Index() {
  return (
    <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
      <Header />
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingVertical: 16 }}>
      <View style={{ width: '90%', marginHorizontal: 16, marginVertical: 8 }}>
          <Card
            imageUrl={require("../assets/images/poster1.png")} // React Native requires require for local images
            title="Summer Music Festival 2025"
            description="Join us for an unforgettable evening of live music, food, and entertainment under the stars!"
            postedBy={{
              name: "Music Lovers Group",
              avatar: "https://example.com/avatar.jpg",
            }}
            attendeeCount={247}
            onPress={() => console.log("Card pressed")}
          />
      </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
