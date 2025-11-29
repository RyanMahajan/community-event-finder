import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { Dimensions, Text, View } from 'react-native';

export default function ({ video, isViewable }: { video: any, isViewable: boolean }) { 
  const videoRef = React.useRef<Video>(null)

  React.useEffect(() => {
    if (isViewable) {
        videoRef.current?.playAsync()
    } else {
        videoRef.current?.pauseAsync()
    }
  })

  return (
    <View>
        <Video
            ref={videoRef}
            style={{
            flex: 1,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height
            }}
            source={{ uri: video.signedUrl }}
            useNativeControls
            resizeMode={ResizeMode.COVER}
            isLooping
        />
        <View className="absolute bottom-0 left-0 right-0 p-4">
            <Text></Text>
        </View>
    </View>
  );
}
