import Header from '@/components/header';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';

export default function () {
  const params = useLocalSearchParams()
  console.log(params)
  return (
    <SafeAreaView>
      <Header title="USERNAME" color="black" goBack={true} />
      <Text className="text-black font-bold text-3xl text-center">Profile Here</Text>
    </SafeAreaView>
  );
}
