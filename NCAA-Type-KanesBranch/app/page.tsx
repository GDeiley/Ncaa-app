
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Leaderboard from '@/components/leaderboard'

export default async function Page() {
  const supabase = await createClient()
  const { data, error: authError } = await supabase.auth.getUser()
  if (authError || !data?.user) {
    redirect('/login')
  }
  return (
    <div className=''>
  <Leaderboard id={data.user.id} />
  </div>
  )
}