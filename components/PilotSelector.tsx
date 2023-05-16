import { NextPage } from 'next'
import { Pilot } from '../types/Pilot'
import ErrorLabel from './ErrorLabel'
import Required from './Required'

interface Props {
  category: string
  handleChangePilot: any
  pilots: Pilot[]
  value: number
  error: string
  handleOnFocus: any
}

const PilotSelector: NextPage<Props> = ({
  category,
  handleChangePilot,
  pilots,
  value,
  error,
  handleOnFocus,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="category">
        {category}
        <Required />
      </label>
      <select
        name={category}
        onChange={(evt) => handleChangePilot(Number(evt.target.value))}
        value={value}
        onFocus={() => handleOnFocus('')}
        className={error ? 'border-red-800 mb-0' : 'border-slate-700 mb-4'}
        required
      >
        <option key={0} value={0} disabled>
          Selecione
        </option>
        {pilots.map((pilot) => {
          return (
            <option key={pilot.id} value={pilot.id}>
              {pilot.name}
            </option>
          )
        })}
      </select>
      <ErrorLabel msg={error} />
    </div>
  )
}

export default PilotSelector
