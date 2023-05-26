import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

import { Props } from '../pages'

// export const supabase = createBrowserSupabaseClient<Database>();

// export const getActiveProductsWithPrices = async (): Promise<
//   ProductWithPrice[]
// > => {
//   const { data, error } = await supabase
//     .from('products')
//     .select('*, prices(*)')
//     .eq('active', true)
//     .eq('prices.active', true)
//     .order('metadata->index')
//     .order('unit_amount', { foreignTable: 'prices' });

//   if (error) {
//     console.log(error.message);
//   }
//   // TODO: improve the typing here.
//   return (data as any) || [];
// };

// export const updateUserName = async (user: User, name: string) => {
//   await supabase
//     .from('users')
//     .update({
//       full_name: name
//     })
//     .eq('id', user.id);
// };

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
