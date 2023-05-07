import type { NextPage } from 'next'
import PilotSelector from '../components/PilotSelector'
import UserIdentificator from '../components/UserIdentificator'
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Pilot } from '../types/Pilot'
import { Bid } from '../types/Bid'
import Head from 'next/head'

export const config = {
  unstable_runtimeJS: false,
}

interface Props {
  pilots: Pilot[]
}

const Home: NextPage<Props> = ({ pilots }) => {
  const [user, setUser] = useState('')
  const [selectedP10, setSelectedP10] = useState(0)
  const [selectedFirstRetirement, setSelectedFirstRetirement] = useState(0)
  const currentGp = 1

  const errorMessage = (msg: string) => {
    alert(msg)
  }
  const successMessage = () => {
    alert('Deu boa')
  }
  const resetBid = () => {
    setSelectedP10(0)
    setSelectedFirstRetirement(0)
  }

  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault()

    try {
      let bidId = undefined
      let { error: userError, data: userRef } = await supabase
        .from('users')
        .select('id, name')
        .eq('key', user)
        .single()
      if (userError || !userRef) {
        errorMessage('Teu ID tá errado!')
        throw userError
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
    <>
      <Head>
        <title>P10 Racing</title>
        <meta
          name="description"
          content="P10 da rapaziada. Bora apostar no primeiro a se retirar da corrida e no décimo colocado."
        />
      </Head>
      <main>
        <header className="border-b-2 border-gray-600 border-solid">
          <h1 className="p-5 text-2xl">GP: Miami</h1>
        </header>
        <form className='flex flex-col gap-8' onSubmit={handleFormSubmit}>
          <UserIdentificator handleUserChange={setUser} />
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
          <button type="submit" className='border-2 border-solid border-slate-400 mt-6 py-2'>Salvar</button>
        </form>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  let { data } = await supabase.from('pilots').select()

  return {
    props: {
      pilots: data,
    },
  }
}

export default Home
