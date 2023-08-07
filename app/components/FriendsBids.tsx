import { NextPage } from 'next'
import { FriendBid } from '../../types/FriendBid'
import { Gp } from '../../types/Gp'
import { User } from '../../types/User'

interface Props {
  users: User[]
  bids: FriendBid[]
  gps: Gp[]
}

interface TotalPoints {
  user: number
  points: number
}

const FriendsBids: NextPage<Props> = ({ users, bids, gps }) => {
  let totalPoints: TotalPoints[] = users.map((user) => {
    return {
      user: user.id,
      points: bids
        ? bids.reduce(
            (points, bid) =>
              bid.user === user.id ? points + bid.points : points,
            0
          )
        : 0,
    }
  })

  return (
    <section>
      <hr />
      <h2 className="p-4">Apostas dos amigos</h2>
      <div className="relative overflow-x-auto shadow-md rounded-lg">
        <table>
          <thead>
            <tr>
              <th>GP</th>
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
              <th></th>
              {users.map(() => (
                <>
                  <th>P-10</th>
                  <th className="border-r-2 border-gray-800">1st Retirement</th>
                </>
              ))}
            </tr>
            {gps.map((gp) => (
              <>
                <tr>
                  <td rowSpan={2}>{gp.location}</td>
                  {users.map((user) => {
                    const userBid = bids
                      .filter((bid) => bid.user === user.id && bid.gp === gp.id)
                      .shift()

                    if (!userBid) {
                      return (
                        <>
                          <td></td>
                          <td className="border-r-2 border-gray-800"></td>
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
                    const userBid = bids
                      .filter((bid) => bid.user === user.id && bid.gp === gp.id)
                      .shift()
                    if (!userBid) {
                      return (
                        <td
                          colSpan={2}
                          className="bg-slate-700 p-1.5 border-r-2 border-gray-800 text-xs text-slate-400"
                        >
                          0
                        </td>
                      )
                    }
                    return (
                      <>
                        <td
                          colSpan={2}
                          className="bg-slate-700 p-1.5 border-r-2 border-gray-800 text-xs text-slate-400"
                        >
                          {userBid.points}
                        </td>
                      </>
                    )
                  })}
                </tr>
              </>
            ))}
            <tr>
              <td className="uppercase bg-emerald-1000 border-t-8 border-slate-900">
                Total
              </td>
              {totalPoints.map((total) => (
                <>
                  <td
                    colSpan={2}
                    className="bg-emerald-900 border-t-8 border-slate-900 border-r-2"
                  >
                    {total.points}
                  </td>
                </>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default FriendsBids
