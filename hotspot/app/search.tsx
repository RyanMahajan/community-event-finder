import Header from '@/components/header';
import { supabase } from '@/utils/supabase';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';

export default function () {
  const [text, setText] = React.useState('')
  const [results, setResults] = React.useState('')
  const router = useRouter()

  const search = async () => {
    const { data, error } = await supabase.from('User').select('*').eq('username', text)
    setResults(data)
  }

  return (
    <SafeAreaView className="flex-1">
      <Header title="Search" color="black" goBack />
      <View className='flex-row gap-2 mt-5 mx-2'>
        <TextInput
          className="flex-1 bg-white p-4 rounded-3xl border border-gray-300"
          placeholder="Search"
          onChangeText={(i) => setText(i)}
          value={text}
        />
        <TouchableOpacity onPress={search}>
          <Ionicons name="arrow-forward-circle" size={50} color="red" /> 
        </TouchableOpacity>
      </View>
      <FlatList
        data={results}
        renderItem={({ item: user }) =>
          <TouchableOpacity className='flex-row gap-2 items-center w-full m-3' onPress={() => router.push(`/user?user_id=${user.id}`)}>
            <Image 
              source={{ uri: 'https://placholder.co/40x40' }}
              className="w-10 h-10 rounded-full bg-black"
            />
            <Text className='font-bold text-base'>{user?.username}</Text>
          </TouchableOpacity>
        }
      />
    </SafeAreaView>
  );
}
