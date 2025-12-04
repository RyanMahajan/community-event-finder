import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/utils/supabase';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';

export default function ({ user, followers, following } : { user: any, following: any, followers: any }) {
  const { user: authUser, signOut, following: myFollowing, getFollowing } = useAuth()
  const [profilePicture, setProfilePicture] = React.useState<string>('')
  
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
          <Text className="text-md">1000</Text>
        </View>
      </View>
      <View>
        {
          authUser?.id === user?.id ? (
            <TouchableOpacity className="bg-black px-4 py-2 rounded-lg w-full m-3" onPress={signOut}>
              <Text className="text-white font-bold text-lg">Sign Out</Text>
            </TouchableOpacity>
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
      </View>
    </SafeAreaView>
  );
}
