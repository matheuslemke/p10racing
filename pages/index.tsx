import type { NextPage } from 'next'
import PilotSelector from '../components/PilotSelector'
import UserIdentificator from '../components/UserIdentificator'
import { useState } from 'react'

export const config = {
  unstable_runtimeJS: false,
}

const Home: NextPage = () => {
  const [selectedP10, setSelectedP10] = useState('')
  const [selectedFirstRetirement, setSelectedFirstRetirement] = useState('')
  const handleFormSubmit = () => {}

  return (
    <>
      <h1>GP: Azerbaijan</h1>
      <form onSubmit={handleFormSubmit}>
        <UserIdentificator />
        <PilotSelector
          category={'P-10'}
          selectedPilot={selectedP10}
          handleChangePilot={setSelectedP10}
        />
        <PilotSelector
          category={'1st Retirement'}
          selectedPilot={selectedFirstRetirement}
          handleChangePilot={setSelectedFirstRetirement}
        />
        <button type="submit">Salvar</button>
      </form>
    </>
  )
}

export default Home
