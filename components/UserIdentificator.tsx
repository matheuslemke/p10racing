import { NextPage } from 'next'
import { ChangeEventHandler } from 'react'

interface Props {
  handleUserChange: any
}

const UserIdentificator: NextPage<Props> = ({ handleUserChange }) => {
  return (
    <div>
      <label htmlFor="user">{'Quem é você'}</label>
      <input onChange={(evt) => handleUserChange(evt.target.value)} />
    </div>
  )
}

export default UserIdentificator
