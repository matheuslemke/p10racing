import { NextPage } from 'next'
import PodiumPlace from '../components/PodiumPlace'
import { getPilotsRanking } from '../utils/supabase-client'
import { RankingUser } from '../types/RankingUser'
import RankingOutOfPodium from '../components/RankingOutOfPodium'

interface Props {
  rankingUsers: RankingUser[]
}

const Ranking: NextPage<Props> = ({ rankingUsers }) => {
  return (
    <aside className="h-screen">
      <section className="flex justify-center items-end h-1/2 gap-x-2">
        <PodiumPlace h="h-32" user={rankingUsers[1]} place={2} />
        <PodiumPlace h="h-40" user={rankingUsers[0]} place={1} />
        <PodiumPlace h="h-24" user={rankingUsers[2]} place={3} />
      </section>
      <section className="absolute bottom-0 w-full">
        <table>
          <RankingOutOfPodium user={rankingUsers[3]} />
          <RankingOutOfPodium user={rankingUsers[4]} />
          <RankingOutOfPodium user={rankingUsers[5]} />
          <RankingOutOfPodium user={rankingUsers[6]} />
        </table>
      </section>
    </aside>
  )
}

export const getServerSideProps = async () => {
  const props = { rankingUsers: await getPilotsRanking() }
  return {
    props,
  }
}

export default Ranking
