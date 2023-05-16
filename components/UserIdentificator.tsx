import { NextPage } from 'next'
import Required from './Required'
import ErrorLabel from './ErrorLabel'

interface Props {
  handleUserChange: any
  error: string
  handleOnFocus: any
}

const UserIdentificator: NextPage<Props> = ({ handleUserChange, error, handleOnFocus }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="user">
        {'Quem é você'}
        <Required />
      </label>

      <input
        onChange={(evt) => handleUserChange(evt.target.value)}
        placeholder="User key"
        className={
          'placeholder:text-slate-700 ' +
          (error ? 'border-red-800 mb-0' : 'border-slate-700 mb-4')
        }
        onFocus={() => handleOnFocus('')}
        required
      />
      <ErrorLabel msg={error} />
    </div>
  )
}

export default UserIdentificator
