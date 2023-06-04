import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Props } from '../pages'
import { UserRef } from '../types/UserRef'
import { Gp } from '../types/Gp'
import { NoUserRefError } from '../lib/errors/NoUserRefError'
import { RankingUser } from '../types/RankingUser'

export const supabase = createBrowserSupabaseClient<any>()

export const getInitialServerProps = async (): Promise<Props> => {
  const { data: pilots } = await supabase.from('pilots').select()
  const { data: users } = await supabase
    .from('users')
    .select('id, name')
    .order('name', { ascending: true })
  const { data: bids } = await supabase
    .from('bids')
    .select('id, gp, user, p10(name), first_retirement(name), points')
  const { data: gps } = await supabase
    .from('gps')
    .select('id, location, seq, date')
    .order('seq')

  return { pilots, users, bids, gps } as Props
}

export const getUserRef = async (user: string): Promise<UserRef> => {
  let { error, data: userRef } = await supabase
    .from('users')
    .select('id, name')
    .eq('key', user)
    .single()
  if (error || !userRef) {
    throw new NoUserRefError('O ID está errado!')
  }
  return userRef
}

export const getBidIdForUser = async (
  currentGp: Gp,
  userRef: UserRef
): Promise<number> => {
  let { error, data: bids } = await supabase
    .from('bids')
    .select('id')
    .eq('gp', currentGp.id)
    .eq('user', userRef.id)

  if (error) throw error

  if (bids && bids.length > 0) {
    return bids[0].id
  }
  return -1
}

export const getPilotsRanking = async (): Promise<RankingUser[]> => {
  let { error, data: rankingPilots } = await supabase
    .from('ranking')
    .select('name, points')

  if (error) throw error

  return rankingPilots as RankingUser[]
}
