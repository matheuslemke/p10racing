import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utils/supabase-client'

export default async function submit(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return errorResponse(res, 'Method should be post')
  }

  let { error: bidError } = await supabase.from('bids').upsert(req.body)

  if (bidError) {
    return errorResponse(res, 'Bid error')
  }

  res.status(200).json({ msg: 'ok' })
}

const errorResponse = (res: NextApiResponse, msg: string) => {
  return res.status(400).json({ msg })
}
