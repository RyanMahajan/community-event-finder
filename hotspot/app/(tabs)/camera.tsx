import Ionicons from '@expo/vector-icons/Ionicons';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import '../../global.css';

export default function () {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <CameraView style={{ flex: 1 }} facing={facing}>
      <View className="flex-1 justify-end">
        <View className="flex-row items-center justify-around mb-10">
          <TouchableOpacity className="items-end justify-end" onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse" size={50} color="transparent" />
          </TouchableOpacity>
          <TouchableOpacity className="items-end justify-end" onPress={toggleCameraFacing}>
            <Ionicons name="radio-button-on" size={100} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="items-end justify-end" onPress={toggleCameraFacing}>
            <Ionicons name="camera" size={50} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});