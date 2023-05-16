import { NextPage } from 'next'
import PilotSelector from './PilotSelector'
import UserIdentificator from './UserIdentificator'
import { Pilot } from '../types/Pilot'
import { Gp } from '../types/Gp'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Bid } from '../types/Bid'

interface Props {
  pilots: Pilot[]
  currentGp: Gp
}

const BidForm: NextPage<Props> = ({ pilots, currentGp }) => {
  const [user, setUser] = useState('')
  const [selectedP10, setSelectedP10] = useState(0)
  const [selectedFirstRetirement, setSelectedFirstRetirement] = useState(0)
  const [userError, setUserError] = useState('')

  const resetBid = () => {
    setSelectedP10(0)
    setSelectedFirstRetirement(0)
    resetErrors()
  }
  const resetErrors = () => {
    setUserError('')
  }

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault()
    resetErrors()

    try {
      let bidId = undefined
      let { error, data: userRef } = await supabase
        .from('users')
        .select('id, name')
        .eq('key', user)
        .single()
      if (error || !userRef) {
        setUserError('O ID está errado!')
        throw error
      }

      let { error: bidDoesntExistsError, data: bids } = await supabase
        .from('bids')
        .select('id')
        .eq('gp', currentGp)
        .eq('user', userRef.id)

      if (bidDoesntExistsError) throw bidDoesntExistsError

      if (bids && bids.length > 0) {
        bidId = bids[0].id
      }

      let { error: bidError } = await supabase.from('bids').upsert({
        id: bidId,
        gp: 1,
        user: userRef.id,
        p10: selectedP10,
        first_retirement: selectedFirstRetirement,
      } as Bid)

      if (bidError) {
        errorMessage(`Faça direito ${userRef.name}`)
        throw bidError
      }

      resetBid()
      successMessage()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section>
      <h2 className="pl-4 pt-4">GP: {currentGp?.location}</h2>
      <form className="flex flex-col gap-6" onSubmit={handleFormSubmit}>
        <UserIdentificator handleUserChange={setUser} error={userError} handleOnFocus={setUserError}/>
        <PilotSelector
          category={'P-10'}
          handleChangePilot={setSelectedP10}
          pilots={pilots}
          value={selectedP10}
        />
        <PilotSelector
          category={'1st Retirement'}
          handleChangePilot={setSelectedFirstRetirement}
          pilots={pilots}
          value={selectedFirstRetirement}
        />
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="border-2 border-solid border-slate-400 mt-6 py-2 px-8 w-fit"
          >
            Salvar
          </button>
        </div>
      </form>
    </section>
  )
}

const errorMessage = (msg: string) => {
  console.error(msg)
}
const successMessage = () => {
  alert('Deu boa')
}

export default BidForm
