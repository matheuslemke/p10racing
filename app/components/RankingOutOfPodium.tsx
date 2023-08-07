import { NextPage } from 'next'
import { RankingUser } from '../../types/RankingUser'

interface Props {
  user: RankingUser
}

const RankingOutOfPodium: NextPage<Props> = ({ user }) => {
  return (
    <tr>
      <td>
        <label className="text-xl">{user.name}</label>
      </td>
      <td>
        <span className="text-base text-emerald-600">pts: {user.points}</span>
      </td>
    </tr>
  )
}

export default RankingOutOfPodium
