import { NextPage } from 'next'
import Required from './Required'

interface Props {
  handleUserChange: any
}

const UserIdentificator: NextPage<Props> = ({ handleUserChange }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="user">
        {'Quem é você'}
        <Required />
      </label>

      <input
        onChange={(evt) => handleUserChange(evt.target.value)}
        placeholder="User key"
        className="placeholder:text-slate-700"
        required
      />
    </div>
  )
}

export default UserIdentificator
