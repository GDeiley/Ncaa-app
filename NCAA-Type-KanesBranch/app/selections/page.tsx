
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import CarouselSelect from "./components/CarouselSelect";

export default async function Selections() {
  const supabase = await createClient()
  const { data, error: authError } = await supabase.auth.getUser()
  if (authError || !data?.user) {
    redirect('/login')
  }

  return (
  <div className="h-[200px] w-screen">
    <CarouselSelect id={data.user.id}></CarouselSelect>
    </div>
  )
}