import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/utils/supabase';
import { ResizeMode, Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert, Dimensions, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';

export default function ({ user, followers, following } : { user: any, following: any, followers: any }) {
  const { user: authUser, signOut, following: myFollowing, getFollowing } = useAuth()
  const [profilePicture, setProfilePicture] = React.useState<string>('')
  const [videos, setVideos] = React.useState<any[]>([])
  const [likes, setLikes] = React.useState<any[]>([])
  const videoRef = React.useRef<Video>(null)
  
  React.useEffect(() => {
    getVideos()
    getLikes()
  }, [user])
  
  const getVideos = async () => {
    const { data, error } = await supabase
      .from('Video')
      .select('*, User(*)')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })
      .limit(3)
    getSignedUrls(data)
  }

  const getLikes = async () => {
    const { data, error } = await supabase
      .from('Like')
      .select('*')
      .eq('video_user_id', user?.id)
    setLikes(data)
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    if (authUser?.id !== user?.id) return
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
    setProfilePicture(result.assets[0].uri)
    saveImage(result.assets[0].uri)
  };

  const saveImage = async (uri: string) => {
    const formData = new FormData()
    const fileName = uri?.split('/').pop()
    const extension = fileName?.split('.').pop()
    formData.append('file', {
      type: `image/${extension}`,
      name: `avatar.${extension}`,
      uri
    })

    const { data, error } = await supabase.storage
      .from(`avatars/${user?.id}`)
      .upload(`avatar.${extension}`, formData, {
        cacheControl: '3600000000',
        upsert: true
      })
    if (error) console.error(error)
  }

  const followerUser = async () => {
    const { error } = await supabase
      .from('Follower')
      .insert({
        user_id: authUser?.id,
        follower_user_id: user?.id
      })
    if (!error) getFollowing(authUser?.id)
  }
  
  const unFollowerUser = async () => {
    const { error } = await supabase
      .from ('Follower')
      .delete()
      .eq('user_id', authUser?.id)
      .eq('follower_user_id', user?.id)
    if (!error) getFollowing(authUser?.id)
  }

  return (
    <SafeAreaView className="flex-1 items-center">
      <TouchableOpacity onPress={pickImage}>
        <Image 
          source={{ uri: profilePicture|| `${process.env.EXPO_PUBLIC_BUCKET}/avatars/${user?.id}/avatar.jpeg` }} 
          className="w-20 h-20 rounded-full bg-black" 
        />
      </TouchableOpacity>
      <Text className="text-2xl font-bold my-3">@{user?.username}</Text>
      <View className="flex-row items-center justify-around w-full my-3">
        <View className="items-center justify-center">
          <Text className="text-md font-semibold">Following</Text>
          <Text className="text-md">{following.length}</Text>
        </View>
        <View className="items-center justify-center">
          <Text className="text-md font-semibold">Followers</Text>
          <Text className="text-md">{followers.length}</Text>
        </View>
        <View className="items-center justify-center">
          <Text className="text-md font-semibold">Likes</Text>
          <Text className="text-md">{likes.length}</Text>
        </View>
      </View>
      {
        authUser?.id === user?.id ? (
          <View>
            <TouchableOpacity className="bg-black px-4 py-2 rounded-lg w-full m-3" onPress={signOut}>
              <Text className="text-white font-bold text-lg">Sign Out</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            {myFollowing.filter((u: any) => u.follower_user_id === user?.id).length > 0 ? (
              <TouchableOpacity className="bg-red-400 px-4 py-2 rounded-lg w-full m-3" onPress={unFollowerUser}>
                <Text className="text-white font-bold text-lg">Unfollow</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="bg-red-400 px-4 py-2 rounded-lg w-full m-3" onPress={followerUser}>
                <Text className="text-white font-bold text-lg">Follow</Text>
              </TouchableOpacity>
            )}
          </View>
        )
      }
      <FlatList
        numColumns={3}
        data={videos}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => 
          <Video
            ref={videoRef}
            style={{
              width: Dimensions.get('window').width * .333,
              height: 225
            }}
            source={{ uri: item.signedUrl }}
            resizeMode={ResizeMode.COVER}
          />
        }
      />
    </SafeAreaView>
  );
}
