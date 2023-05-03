import { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'

const initialState = { id: '0', name: 'Selecione' }

const pilots: Pilot[] = [
  { id: '1', name: 'Max Verstappen' },
  { id: '11', name: 'Sergio Pérez' },
  { id: '14', name: 'Fernando Alonso' },
  { id: '44', name: 'Lewis Hamilton' },
  { id: '55', name: 'Carlos Sainz' },
  { id: '63', name: 'George Russell' },
  { id: '18', name: 'Lance Stroll' },
  { id: '16', name: 'Charles Leclerc' },
  { id: '4', name: 'Lando Norris' },
  { id: '27', name: 'Nico Hülkenberg' },
  { id: '77', name: 'Valtteri Bottas' },
  { id: '31', name: 'Esteban Ocon' },
  { id: '81', name: 'Oscar Piastri' },
  { id: '10', name: 'Pierre Gasly' },
  { id: '24', name: 'Zhou Guanyu' },
  { id: '22', name: 'Yuki Tsunoda' },
  { id: '20', name: 'Kevin Magnussen' },
  { id: '23', name: 'Alexander Albon' },
  { id: '2', name: 'Logan Sargeant' },
  { id: '21', name: 'Nyck de Vries' },
]

interface Props {
  category: string
  selectedPilot: string
  handleChangePilot: any
}

const PilotSelector: NextPage<Props> = ({ category, selectedPilot, handleChangePilot }) => {

  return (
    <div>
      <label htmlFor="category">{category}</label>
      <select
        value={selectedPilot}
        onChange={(evt) => handleChangePilot(evt.target.value)}
        defaultValue={'0'}
      >
        <option key="0" value="0" disabled>
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
