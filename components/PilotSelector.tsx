import { NextPage } from 'next'
import { Pilot } from '../types/Pilot'

interface Props {
  category: string
  handleChangePilot: any
  pilots: Pilot[]
  value: number
}

const PilotSelector: NextPage<Props> = ({
  category,
  handleChangePilot,
  pilots,
  value,
}) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor="category">{category}</label>
      <select
        name={category}
        onChange={(evt) => handleChangePilot(Number(evt.target.value))}
        value={value}
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
    </div>
  )
}

export default PilotSelector
