import { NextPage } from 'next'
import Link from 'next/link'

const Header: NextPage = () => {
  return (
    <header className="border-b-2 border-gray-600 border-solid flex">
      <h1 className="p-5 text-2xl">P10 da rapaziada</h1>
      <span className='place-self-center ml-auto mr-5 text-sky-400 hover:underline'>
        <Link href="/ranking">Ranking</Link>
      </span>
    </header>
  )
}

export default Header
