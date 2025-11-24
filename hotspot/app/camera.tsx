import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/utils/supabase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CameraType, CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import '../global.css';

export default function () {
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraPermission, requestCamPermission] = useCameraPermissions()
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [isRecording, setIsRecording] = useState(false)
  const cameraRef = React.useRef<CameraView>(null)
  const [videoUri, setVideoUri] = useState<string | null>(null)
  const { user } = useAuth()
  const router = useRouter()

  if (!cameraPermission?.granted || !micPermission?.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button 
          title="grant permission" 
          onPress={async () => {
            await requestCamPermission()
            await requestMicPermission()
          }} 
        />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const recordVideo = async () => {
    if (isRecording) {
      setIsRecording(false)
      cameraRef.current?.stopRecording()
    } else {
      setIsRecording(true)
      const video = await cameraRef.current?.recordAsync()
      setVideoUri(video.uri)
    }
  } 

  const saveVideo = async () => {
    const formData = new FormData()
    const fileName = videoUri?.split('/').pop()
    formData.append('file', {
      uri: videoUri,
      type: `video/${fileName?.split('.').pop()}`,
      name: fileName
    })

    const { data, error } = await supabase.storage
      .from('videos')
      .upload(fileName, formData, {
        cacheControl: '3600000000',
        upsert: false
      })
    if (error) console.error(error)

    const { error: videoError } = await supabase.from('Video').insert({
      title: "Test title here!",
      uri: data.path,
      user_id: user?.id
    })
    if (videoError) console.error(videoError)
    router.back()
  }

  return (
    <CameraView mode="video" ref={cameraRef} style={{ flex: 1 }} facing={facing}>
      <View className="flex-1 justify-end">
        <View className="flex-row items-center justify-around mb-10">
          <TouchableOpacity className="items-end justify-end" onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse" size={50} color="rgba(0, 0, 0, 0.01)" />
          </TouchableOpacity>
          { videoUri ? (
            <TouchableOpacity className="items-end justify-end" onPress={saveVideo}>
              <Ionicons name="checkmark-circle" size={100} color="white" />
            </TouchableOpacity> 
          ) : (
            <TouchableOpacity className="items-end justify-end" onPress={recordVideo}>
              { !isRecording ? <Ionicons name="radio-button-on" size={100} color="white" /> : <Ionicons name="pause-circle" size={100} color="red" /> }
            </TouchableOpacity>
          )}
          <TouchableOpacity className="items-end justify-end" onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse" size={50} color="white" />
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