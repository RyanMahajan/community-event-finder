import Header from '@/components/header';
import { useAuth } from '@/providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';

export default function () {
  const router = useRouter()
  const { followers } = useAuth()
  console.log(followers)

  return (
    <SafeAreaView className="flex-1">
      <Header title='Followers' color='black' goBack />
      <FlatList
        data={followers}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/user?user_id=${item.user_id}`)} className='flex-row gap-2 items-center w-full m-1'>
                <View className='flex-row justify-between w-full items-center pr-5'>
                <View className='flex-row gap-2'>
                    <Image 
                        source={{ uri: 'https://placehold.co/40x40' }} 
                        className="w-12 h-12 rounded-full bg-black" 
                    />
                    <View>
                        <Text className='font-bold text-base'>{item.user.name}</Text>
                        <Text>Say hi!</Text>
                    </View>
                </View>
                    <Ionicons name='chevron-forward' size={20} color='black' />
                </View>
            </TouchableOpacity>
        )}
      />
      
    </SafeAreaView>
  );
}
