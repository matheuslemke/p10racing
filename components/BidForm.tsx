import { NextPage } from 'next'
import Router from 'next/router'
import { useState } from 'react'
import { Bid } from '../types/Bid'
import { Gp } from '../types/Gp'
import { Pilot } from '../types/Pilot'
import PilotSelector from './PilotSelector'
import SuccessFeedback from './SuccessFeedback'
import UserIdentificator from './UserIdentificator'
import { getBidIdForUser, getUserRef } from '../utils/supabase-client'
import { NoUserRefError } from '../lib/errors/NoUserRefError'
import Loading from './Loading'

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
  const [isLoading, setIsLoading] = useState(false)

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
    setIsLoading(true)
    evt.preventDefault()
    resetErrors()

    const closeDate = new Date(currentGp.date)
    closeDate.setHours(closeDate.getHours() - 2)
    const now = new Date()
    if (now >= closeDate) {
      setIsClosed(true)
      setIsLoading(false)
      return
    }

    try {
      const userRef = await getUserRef(user)
      const bidId = await getBidIdForUser(currentGp, userRef)

      const bid = {
        gp: currentGp.id,
        user: userRef.id,
        p10: selectedP10,
        first_retirement: selectedFirstRetirement,
      } as Bid

      if (bidId !== -1) {
        console.log('bidId', bidId)
        bid.id = bidId
      }

      console.log('bid', bid)

      const response = await fetch('/api/bids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bid),
      })

      if (response.status === 400) {
        if (!selectedP10) {
          setP10Error('Selecione o piloto')
        }
        if (!selectedFirstRetirement) {
          setFirstRetirementError('Selecione o piloto')
        }
        setIsLoading(false)
        return
      }

      resetBid()
      setSuccess(true)
      setIsLoading(false)
      Router.reload()
    } catch (error) {
      if (error instanceof NoUserRefError) {
        setUserError('O ID está errado!')
        setIsLoading(false)
        return
      }
      console.error(error)
      throw error
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
      <form className="flex flex-col gap-6 p-7" onSubmit={handleFormSubmit}>
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
            type="submit"
            className="border-2 border-solid border-slate-400 mt-6 py-2 px-8 w-fit disabled:border-slate-800 disabled:text-slate-800"
            disabled={isClosed || isLoading}
          >
            {isLoading ? <Loading /> : 'Salvar'}
          </button>
        </div>
      </form>
    </>
  )
}

export default BidForm
