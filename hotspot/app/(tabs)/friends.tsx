import { useAuth } from '@/providers/AuthProvider';
import { Text, View } from 'react-native';
import '../../global.css';

export default function () {
  const { user } = useAuth()

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-black font-bold text-3xl">Friends</Text>
      <Text className="text-black font-bold text-2xl">Hello, {JSON.stringify(user)}!</Text>
      <Text className="text-black font-bold text-2xl">Welcome to Hotspot.</Text>
    </View>
  );
}
