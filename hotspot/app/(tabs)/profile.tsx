import Profile from '@/components/profile';
import { useAuth } from '@/providers/AuthProvider';
import '../../global.css';

export default function () {
  const { user, signOut, following, followers } = useAuth()

  return <Profile user={user} following={following} followers={followers} />
}
