import { RankingUser } from '../types/RankingUser'

interface Props {
  h: string
  user: RankingUser
  place: number
}

const PodiumPlace = ({ h, user, place }: Props) => {
  return (
    <div
      className={`relative flex flex-col w-[33vw] items-center justify-center ${h} shadow-lg shadow-indigo-500/40 rounded-lg border-2 border-slate-800`}
    >
      <span className="absolute top-1 left-1 text-slate-700 text-base">
        #{place}
      </span>
      <label className="mr-0 text-2xl text-gray-300 mt-4">{user.name}</label>
      <span className="text-base text-emerald-600">pts: {user.points}</span>
    </div>
  )
}

export default PodiumPlace
