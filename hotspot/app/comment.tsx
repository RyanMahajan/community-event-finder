import Messages from '@/components/messages'
import { useAuth } from '@/providers/AuthProvider'
import { supabase } from '@/utils/supabase'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import '../global.css'

export default function () {
    const { user } = useAuth()
    const params = useLocalSearchParams()
    console.log(params)
    const [comments, setComments] = React.useState<any []>([])

    React.useEffect(() => {
        getComments()
    }, [])

    const getComments = async () => {
        const { data, error } = await supabase
            .from('Comment')
            .select('*, User(*)')
            .eq('video_id', params.video_id)
        if (error) return console.log(error)
        setComments(data)
    }

    const addComment = async (text: string) => {
        const { error } = await supabase.from('Comment').insert({
            user_id: user.id,
            video_id: params.video_id,
            text,
            video_user_id: params.video_user_id,
        })
        if (error) return console.log(error)
        getComments()
    }

    return <Messages messages={comments} addMessage={addComment} />
}