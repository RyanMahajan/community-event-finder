import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/utils/supabase';
import { FontAwesome, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Share, Text, TouchableOpacity, View } from 'react-native';
import '../global.css';

export default function ({ video, isViewable }: { video: any, isViewable: boolean }) { 
  const { user, likes, getLikes } = useAuth()
  const videoRef = React.useRef<Video>(null)
  const router = useRouter()

  React.useEffect(() => {
    if (isViewable) {
        videoRef.current?.playAsync()
    } else {
        videoRef.current?.pauseAsync()
    }
  })

  const shareVideo = () => {
    Share.share({
        message: `Check out this video: ${video.title}`
    })
  }

  const likeVideo = async () => {
    const { data, error } = await supabase
      .from('Like')
      .insert({
        user_id: user?.id,
        video_id: video.id,
        video_user_id: video.User.id
    })
    if (!error) getLikes(user?.id)
  }

  const unlikeVideo = async () => {
    const { data, error } = await supabase
      .from('Like')
      .delete()
      .eq('user_id', user?.id)
      .eq('video_id', video.id)
    if (!error) getLikes(user?.id)
  }
  
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
        <View className="absolute bottom-28 left-0 right-0">
            <View className="flex-1 flex-row items-end justify-between m-3">
                <View>
                    <Text className="text-white text-2xl font-bold mt-18">{video.User.username}</Text>
                    <Text className="text-white text-xl font-semibold">{video.title}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={() => router.push(`/user?user_id=${video.User.id}`)}>
                        <Ionicons name="person" size={40} color="white" />
                    </TouchableOpacity>
                    {likes.filter((like: any) => like.video_id === video.id).length > 0 ? (
                        <TouchableOpacity className="mt-6" onPress={unlikeVideo} >
                            <FontAwesome6 name="fire-flame-curved" size={40} color="orange" />
                        </TouchableOpacity> 
                    ) : (
                        <TouchableOpacity className="mt-6" onPress={likeVideo} >
                            <FontAwesome6 name="fire-flame-curved" size={40} color="white" />
                        </TouchableOpacity> 
                    )}
                    <TouchableOpacity className="mt-6" onPress={() => router.push(`/comment?video_id=${video.id}`)}>
                        <Ionicons name="chatbubble-ellipses" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity className="mt-6" onPress={shareVideo}>
                        <FontAwesome name="share" size={36} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  );
}
