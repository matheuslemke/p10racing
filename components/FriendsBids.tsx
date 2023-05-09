import { NextPage } from 'next'
import { User } from '../types/User'
import { FriendBid } from '../types/FriendBid'
import currentGP from '../lib/currentGP'

interface Props {
  users: User[]
  bids: FriendBid[]
}

interface TotalPoints {
  user: number
  points: number
}

const FriendsBids: NextPage<Props> = ({ users, bids }) => {
  const currentGPBids = bids ? bids.filter((bid) => bid.gp === currentGP) : []

  let totalPoints: TotalPoints[] = users.map((user) => {
    return {
      user: user.id,
      points: bids
        ? bids.reduce(
            (points, bid) => (bid.user === user.id ? points + bid.points : points),
            0
          )
        : 0,
    }
  })

  return (
    <>
      <hr />
      <h2 className="p-4">Apostas dos amigos</h2>
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table>
          <thead>
            <tr>
              {users.map((user) => (
                <th
                  key={user.id}
                  colSpan={2}
                  className="border-r-2 border-gray-800"
                >
                  {user.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {users.map(() => (
                <>
                  <th>P-10</th>
                  <th className="border-r-2 border-gray-800">1st Retirement</th>
                </>
              ))}
            </tr>
            <tr>
              {users.map((user) => {
                const userBid = currentGPBids
                  .filter((bid) => bid.user === user.id)
                  .shift()

                if (!userBid) {
                  return (
                    <>
                      <td>-</td>
                      <td className="border-r-2 border-gray-800">-</td>
                    </>
                  )
                }

                return (
                  <>
                    <td>{userBid.p10.name}</td>
                    <td className="border-r-2 border-gray-800">
                      {userBid.first_retirement.name}
                    </td>
                  </>
                )
              })}
            </tr>
            <tr>
              {users.map((user) => {
                const userBid = currentGPBids
                  .filter((bid) => bid.user === user.id)
                  .shift()
                if (!userBid) {
                  return (
                    <td
                      colSpan={2}
                      className="bg-slate-700 p-1.5 border-r-2 border-gray-800"
                    >
                      0
                    </td>
                  )
                }
                return (
                  <>
                    <td
                      colSpan={2}
                      className="bg-slate-700 p-1.5 border-r-2 border-gray-800"
                    >
                      {userBid.points}
                    </td>
                  </>
                )
              })}
            </tr>
            <tr>
              {totalPoints.map((total) => (
                <>
                  <td
                    colSpan={2}
                    className="bg-emerald-900 border-t-2 border-slate-900 border-r-2"
                  >
                    {total.points}
                  </td>
                </>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default FriendsBids
