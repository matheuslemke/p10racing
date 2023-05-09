import { NextPage } from 'next'
import { User } from '../types/User'
import { FriendBid } from '../types/FriendBid'

interface Props {
  users: User[]
  bids: FriendBid[]
}

const FriendsBids: NextPage<Props> = ({ users, bids }) => {
  return (
    <>
      <hr />
      <h2 className='p-4'>Apostas dos amigos</h2>
      <table>
        <thead>
          <tr>
            {users.map((user) => (
              <th key={user.id} colSpan={2}>
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
                <th>1st Retirement</th>
              </>
            ))}
          </tr>
          <tr>
            {users.map((user) => {
              const userBid = bids.filter((bid) => bid.user === user.id).shift()

              if (!userBid) {
                return (
                  <>
                    <td>-</td>
                    <td>-</td>
                  </>
                )
              }

              return (
                <>
                  <td>{userBid.p10.name}</td>
                  <td>{userBid.first_retirement.name}</td>
                </>
              )
            })}
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default FriendsBids
