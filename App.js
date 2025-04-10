import React from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { Avatar, Header, Card, Button, Icon } from '@rneui/themed';
import { View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        leftComponent={<Text style={styles.leftText}>Mercer Events</Text>}
        backgroundColor="#3D6DCC"
        rightComponent={
          <Avatar
            size={40}
            rounded
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
        }
      />
      <Card containerStyle={styles.card}>
        <Card.Image
          style={styles.cardImage}
          source={{
            uri: 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
          }}
        />
        <Text style={styles.cardText}>
          Ballsack
        </Text>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  card: {
    height: 400, // Fixed height for the entire card
    padding: 0,
    borderRadius: 10,
    overflow: 'hidden', // Prevents image from overflowing
  },
  cardImage: {
    height: 350, // Set the image height (you can adjust this)
    resizeMode: 'cover', // Ensures the image fills the space without distortion
  },
  cardText: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 100,
  },
});

