import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/utils/supabase';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';

export default function ({ user, followers, following } : { user: any, following: any, followers: any }) {
  const { user: authUser, signOut, following: myFollowing, getFollowing } = useAuth()
  const addProfilePicture = async () => {
    //const { data, error } = await supabase.storage.from('profile').upload(user?.id, {
    //  cacheControl: '3600',
    //  upsert: false
    //})
  }
  console.log(myFollowing)

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
      <TouchableOpacity onPress={addProfilePicture}>
        <Image 
          source={{ uri: 'https://placehold.co/40x40' }} 
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
      {
        authUser?.id === user?.id ? (
          <TouchableOpacity className="bg-black px-4 py-2 rounded-l m-3 w-full" onPress={signOut}>
            <Text className="text-white font-bold text-lg">Sign Out</Text>
          </TouchableOpacity>
        ) : (
          <View>
            {myFollowing.filter((u: any) => u.follower_user_id === user?.id).length > 0 ? (
              <TouchableOpacity className="bg-black px-4 py-2 rounded-lg w-full m-3" onPress={unFollowerUser}>
                <Text className="text-white font-bold text-lg">Unfollow</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="bg-black px-4 py-2 rounded-lg w-full m-3" onPress={followerUser}>
                <Text className="text-white font-bold text-lg">Follow</Text>
              </TouchableOpacity>
            )}
          </View>
        )
      }
    </SafeAreaView>
  );
}
