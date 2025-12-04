import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/utils/supabase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ResizeMode, Video } from 'expo-av';
import { CameraType, CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import '../global.css';

export default function () {
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraPermission, requestCamPermission] = useCameraPermissions()
  const [micPermission, requestMicPermission] = useMicrophonePermissions();
  const [isRecording, setIsRecording] = useState(false)
  const cameraRef = React.useRef<CameraView>(null)
  const videoRef = React.useRef<Video>(null)
  const [videoUri, setVideoUri] = useState<string | null>(null)
  const { user } = useAuth()
  const router = useRouter()
  const [status, setStatus] = useState({ isLoaded: false, isPlaying: false })

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
      .from(`videos/${user?.id}`)
      .upload(fileName, formData, {
        cacheControl: '3600000000',
        upsert: false
      })
    if (error) console.error(error)

    const { error: videoError } = await supabase.from('Video').insert({
      title: "Test title here!",
      uri: `${user?.id}/${fileName}`,
      user_id: user?.id
    })
    if (videoError) console.error(videoError)
    router.back()
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });
    setVideoUri(result.assets[0].uri)
  };

  return (
    <View className="flex-1">
        { videoUri ? (
          <View className="flex-1">
            <TouchableOpacity className="absolute bottom-10 self-center z-10" onPress={saveVideo}>
              <Ionicons name="checkmark-circle" size={100} color="white" />
            </TouchableOpacity> 
            <TouchableOpacity className="flex-1" onPress={() => status.isPlaying ? videoRef.current.pauseAsync() : videoRef.current.playAsync()}>
                <Video 
                  ref={videoRef}
                  style={{
                    flex: 1,
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height
                  }}
                  source={{
                    uri: videoUri
                  }}
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping
                  onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
            </TouchableOpacity>
          </View>
        ) : (
            <CameraView mode="video" ref={cameraRef} style={{ flex: 1 }} facing={facing}>
                <View className="flex-1 justify-end">
                    <View className="flex-row items-center justify-around mb-10">
                        <TouchableOpacity className="items-end justify-end" onPress={pickImage}>
                            <Ionicons name="aperture" size={50} color="white" />
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
        )}
    </View>
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