import { supabase } from '@/utils/supabase';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import '../../global.css';

export default function () {
  const router = useRouter();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSignup = async () => {
    console.log(username, email, password)
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    console.log(data, error);
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="w-full p-4">
        <Text className="text-black font-bold text-3xl text-center mb-4">Signup</Text>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          className="bg-white p-4 rounded-lg border border-gray-300 w-full mb-4"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="bg-white p-4 rounded-lg border border-gray-300 w-full mb-4"
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className="bg-white p-4 rounded-lg border border-gray-300 w-full mb-4"
        />
        <TouchableOpacity
          className="bg-black px-4 py-2 rounded-lg"
          onPress={handleSignup}
        >
          <Text className="text-white font-bold text-lg text-center">Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
