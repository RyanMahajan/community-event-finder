import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs, useRouter } from 'expo-router';

export default function TabLayout() {
  const router = useRouter()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#000',
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <Ionicons name={focused ? "home" : "home-outline"} size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ focused }) => <Ionicons name={focused ? "people" : "people-outline"} size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="empty"
        options={{
          title: '',
          tabBarIcon: () => <Ionicons style={{width: 70, height: 70}} name="add-circle" size={70} color="black" />
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault()
            router.push('/camera')
          }
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ focused }) => <Ionicons name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"} size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <Ionicons name={focused ? "person" : "person-outline"} size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
