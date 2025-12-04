import Header from '@/components/header';
import VideoPlayer from '@/components/video';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/utils/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../../global.css';


export default function HomeScreen() {
  const { friends, following } = useAuth()
  const [videos, setVideos] = React.useState<any[]>([])
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const isFocused = useIsFocused()

  React.useEffect(() => {
    getVideos()
  }, [])

  const getVideos = async () => {
    const { data, error } = await supabase
      .from('Video')
      .select('*, User(*)')
      .in('user_id', friends)
      .order('created_at', { ascending: false })
    getSignedUrls(data)
  }

  const getSignedUrls = async (videos: any[]) => {
    const { data, error } = await supabase
      .storage
      .from('videos')
      .createSignedUrls(videos.map((video) => video.uri), 60 * 60  * 24 * 7)
      let videosUrls = videos?.map((item) => {
        item.signedUrl = data?.find((signedUrl) => signedUrl.path === item.uri)?.signedUrl
        return item
      })
    setVideos(videosUrls)
  }

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <View className="absolute top-16 left-0 right-0 z-10">
        <Header title="Friends" color="white" search />
      </View>
      <FlatList 
        data={videos}
        snapToInterval={Dimensions.get('window').height}
        snapToStart
        decelerationRate='fast'
        onViewableItemsChanged={e => setActiveIndex(e.viewableItems[0].key)}
        renderItem={({ item }) => <VideoPlayer video={item} isViewable={activeIndex === item.id && isFocused} />}
        ListEmptyComponent={
          <SafeAreaView className="flex-1 mt-48 items-center justify-center bg-black">
            <Ionicons name='sad' size={20} color='white' />
            <Text className='text-white text-2xl font-bold'>No Friends Yet</Text>
          </SafeAreaView>
        }
      />
    </View>
  );
}
