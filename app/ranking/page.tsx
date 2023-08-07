import PodiumPlace from '../components/PodiumPlace'
import RankingOutOfPodium from '../components/RankingOutOfPodium'
import { RankingUser } from '../../types/RankingUser'
import { getPilotsRanking } from '../../utils/supabase-client'

interface Props {
  rankingUsers: RankingUser[]
}

const Ranking = async () => {
  const { rankingUsers } = await getData()

  return (
    <aside className="h-screen">
      <section className="flex justify-center items-end h-[50%] gap-x-2">
        <PodiumPlace h="h-32" user={rankingUsers[1]} place={2} />
        <PodiumPlace h="h-40" user={rankingUsers[0]} place={1} />
        <PodiumPlace h="h-24" user={rankingUsers[2]} place={3} />
      </section>
      <section className="absolute bottom-0 w-full">
        <table>
          <tbody>
            <RankingOutOfPodium user={rankingUsers[3]} />
            <RankingOutOfPodium user={rankingUsers[4]} />
            <RankingOutOfPodium user={rankingUsers[5]} />
            <RankingOutOfPodium user={rankingUsers[6]} />
          </tbody>
        </table>
      </section>
    </aside>
  )
}

const getData = async (): Promise<Props> => {
  return { rankingUsers: await getPilotsRanking() }
}

export default Ranking
