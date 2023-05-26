import { NextPage } from 'next'
import Router from 'next/router'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Bid } from '../types/Bid'
import { Gp } from '../types/Gp'
import { Pilot } from '../types/Pilot'
import PilotSelector from './PilotSelector'
import SuccessFeedback from './SuccessFeedback'
import UserIdentificator from './UserIdentificator'

interface Props {
  pilots: Pilot[]
  currentGp: Gp
}

const BidForm: NextPage<Props> = ({ pilots, currentGp }) => {
  const [user, setUser] = useState('')
  const [selectedP10, setSelectedP10] = useState(0)
  const [selectedFirstRetirement, setSelectedFirstRetirement] = useState(0)
  const [success, setSuccess] = useState(false)
  const [userError, setUserError] = useState('')
  const [p10Error, setP10Error] = useState('')
  const [firstRetirementError, setFirstRetirementError] = useState('')
  const [isClosed, setIsClosed] = useState(false)

  const resetBid = () => {
    setSelectedP10(0)
    setSelectedFirstRetirement(0)
    resetErrors()
  }
  const resetErrors = () => {
    setUserError('')
    setP10Error('')
    setFirstRetirementError('')
  }

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault()
    resetErrors()

    const closeDate = new Date(currentGp.date)
    closeDate.setHours(closeDate.getHours() - 2)
    const now = new Date()
    if (now >= closeDate) {
      setIsClosed(true)
      return
    }

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
        .eq('gp', currentGp.id)
        .eq('user', userRef.id)

      if (bidDoesntExistsError) throw bidDoesntExistsError

      if (bids && bids.length > 0) {
        bidId = bids[0].id
      }

      const response = await fetch('/api/bids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: bidId,
          gp: currentGp.id,
          user: userRef.id,
          p10: selectedP10,
          first_retirement: selectedFirstRetirement,
        } as Bid),
      })

      if (response.status === 400) {
        if (!selectedP10) {
          setP10Error('Selecione o piloto')
        }
        if (!selectedFirstRetirement) {
          setFirstRetirementError('Selecione o piloto')
        }
        return
      }

      resetBid()
      setSuccess(true)
      Router.reload()
    } catch (e) {
      console.error(e)
    }
  }

  if (success) {
    return (
      <>
        <h2 className="pl-4 pt-4">GP: {currentGp?.location}</h2>
        <SuccessFeedback />
      </>
    )
  }

  return (
    <>
      <h2 className="pl-4 pt-4">GP: {currentGp?.location}</h2>
      <form className="flex flex-col gap-6 p-7">
        <UserIdentificator
          handleUserChange={setUser}
          error={userError}
          handleOnFocus={setUserError}
        />
        <PilotSelector
          category={'P-10'}
          handleChangePilot={setSelectedP10}
          pilots={pilots}
          value={selectedP10}
          error={p10Error}
          handleOnFocus={setP10Error}
        />
        <PilotSelector
          category={'1st Retirement'}
          handleChangePilot={setSelectedFirstRetirement}
          pilots={pilots}
          value={selectedFirstRetirement}
          error={firstRetirementError}
          handleOnFocus={setFirstRetirementError}
        />
        <div className="w-full flex justify-center">
          <button
            type="button"
            onClick={handleFormSubmit}
            className="border-2 border-solid border-slate-400 mt-6 py-2 px-8 w-fit disabled:border-slate-800 disabled:text-slate-800"
            disabled={isClosed}
          >
            Salvar
          </button>
        </div>
      </form>
    </>
  )
}

export default BidForm
