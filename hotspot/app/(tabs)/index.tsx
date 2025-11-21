import { useAuth } from '@/providers/AuthProvider';
import { Text, View } from 'react-native';
import '../../global.css';

export default function HomeScreen() {
  const { user } = useAuth()
  console.log(user)

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-black font-bold text-3xl">Home</Text>
      <Text className="text-black font-bold text-2xl">Hello, {JSON.stringify(user)}!</Text>
      <Text className="text-black font-bold text-2xl">Welcome to Hotspot.</Text>
    </View>
  );
}
