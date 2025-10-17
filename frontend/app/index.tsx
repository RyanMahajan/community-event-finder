import React from "react";
import { Text, View } from "react-native";
import Card from "../components/card"
import Footer from "../components/footer"


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
  <div className="bg-white rounded-xl shadow-lg overflow-hidden m-4 max-w-md">

  <Card 
      imageUrl="https://example.com/event-poster.jpg"
      title="Summer Music Festival 2025"
      description="Join us for an unforgettable evening of live music, food, and entertainment under the stars!"
      postedBy={{
        name: "Music Lovers Group",
        avatar: "https://example.com/avatar.jpg"
      }}
      attendeeCount={247}
      onPress={() => console.log('Card pressed')}
    />
</div>
    <Footer/>
    </View>
  );
}
