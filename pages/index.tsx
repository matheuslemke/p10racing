import type { NextPage } from 'next'
import BidForm from '../components/BidForm'
import FriendsBids from '../components/FriendsBids'
import { FriendBid } from '../types/FriendBid'
import { Gp } from '../types/Gp'
import { Pilot } from '../types/Pilot'
import { User } from '../types/User'
import { getInitialServerProps } from '../utils/supabase-client'
import Header from '../components/Header'

export interface Props {
  pilots: Pilot[]
  users: User[]
  bids: FriendBid[]
  gps: Gp[]
}

const Home: NextPage<Props> = ({ pilots, users, bids, gps }) => {
  const currentGp = gps[gps.length - 1]

  return (
    <>
      <Header />
      <BidForm pilots={pilots} currentGp={currentGp} />
      <FriendsBids users={users} bids={bids} gps={gps} />
    </>
  )
}

export const getServerSideProps = async () => {
  const props = await getInitialServerProps()

  // const pilots = [
  //   { id: 1, name: 'Max Verstappen', number: 1 },
  //   { id: 2, name: 'Sergio Pérez', number: 11 },
  //   { id: 3, name: 'Fernando Alonso', number: 14 },
  //   { id: 4, name: 'Lewis Hamilton', number: 44 },
  //   { id: 5, name: 'Carlos Sainz', number: 55 },
  //   { id: 6, name: 'George Russell', number: 63 },
  //   { id: 7, name: 'Lance Stroll', number: 18 },
  //   { id: 8, name: 'Charles Leclerc', number: 16 },
  //   { id: 9, name: 'Lando Norris', number: 4 },
  //   { id: 10, name: 'Nico Hülkenberg', number: 27 },
  //   { id: 11, name: 'Valtteri Bottas', number: 77 },
  //   { id: 12, name: 'Esteban Ocon', number: 31 },
  //   { id: 13, name: 'Oscar Piastri', number: 81 },
  //   { id: 14, name: 'Pierre Gasly', number: 10 },
  //   { id: 15, name: 'Zhou Guanyu', number: 24 },
  //   { id: 16, name: 'Yuki Tsunoda', number: 22 },
  //   { id: 17, name: 'Kevin Magnussen', number: 20 },
  //   { id: 18, name: 'Alexander Albon', number: 23 },
  //   { id: 19, name: 'Logan Sargeant', number: 2 },
  //   { id: 20, name: 'Nyck de Vries', number: 21 },
  // ]
  // const users = [
  //   { id: 5, name: 'Anchieta' },
  //   { id: 2, name: 'Coquinho' },
  //   { id: 6, name: 'Danzera' },
  //   { id: 1, name: 'Lemke' },
  //   { id: 4, name: 'Nywlis' },
  //   { id: 7, name: 'Pert' },
  //   { id: 3, name: 'Samuel' },
  // ]
  // const bids = [
  //   {
  //     id: 20,
  //     gp: 1,
  //     user: 2,
  //     points: 10,
  //     p10: { name: 'Lewis Hamilton' },
  //     first_retirement: { name: 'Nyck de Vries' },
  //   },
  //   {
  //     id: 19,
  //     gp: 4,
  //     user: 2,
  //     points: 15,
  //     p10: { name: 'Esteban Ocon' },
  //     first_retirement: { name: 'Carlos Sainz' },
  //   },
  //   {
  //     id: 21,
  //     gp: 4,
  //     user: 3,
  //     points: 8,
  //     p10: { name: 'Lance Stroll' },
  //     first_retirement: { name: 'Yuki Tsunoda' },
  //   },
  //   {
  //     id: 22,
  //     gp: 1,
  //     user: 3,
  //     points: 8,
  //     p10: { name: 'Nico Hülkenberg' },
  //     first_retirement: { name: 'Pierre Gasly' },
  //   },
  //   {
  //     id: 23,
  //     gp: 1,
  //     user: 5,
  //     points: 15,
  //     p10: { name: 'Lance Stroll' },
  //     first_retirement: { name: 'Zhou Guanyu' },
  //   },
  //   {
  //     id: 24,
  //     gp: 4,
  //     user: 4,
  //     points: 12,
  //     p10: { name: 'Valtteri Bottas' },
  //     first_retirement: { name: 'Nyck de Vries' },
  //   },
  //   {
  //     id: 25,
  //     gp: 1,
  //     user: 4,
  //     points: 4,
  //     p10: { name: 'Lando Norris' },
  //     first_retirement: { name: 'Zhou Guanyu' },
  //   },
  //   {
  //     id: 26,
  //     gp: 4,
  //     user: 6,
  //     points: 12,
  //     p10: { name: 'Yuki Tsunoda' },
  //     first_retirement: { name: 'Logan Sargeant' },
  //   },
  //   {
  //     id: 27,
  //     gp: 1,
  //     user: 6,
  //     points: 18,
  //     p10: { name: 'Esteban Ocon' },
  //     first_retirement: { name: 'Kevin Magnussen' },
  //   },
  //   {
  //     id: 28,
  //     gp: 4,
  //     user: 1,
  //     points: 6,
  //     p10: { name: 'Fernando Alonso' },
  //     first_retirement: { name: 'Esteban Ocon' },
  //   },
  //   {
  //     id: 30,
  //     gp: 4,
  //     user: 7,
  //     points: 22,
  //     p10: { name: 'Valtteri Bottas' },
  //     first_retirement: { name: 'Nyck de Vries' },
  //   },
  //   {
  //     id: 31,
  //     gp: 1,
  //     user: 7,
  //     points: 15,
  //     p10: { name: 'Lance Stroll' },
  //     first_retirement: { name: 'Oscar Piastri' },
  //   },
  //   {
  //     id: 29,
  //     gp: 1,
  //     user: 1,
  //     points: 15,
  //     p10: { name: 'Max Verstappen' },
  //     first_retirement: { name: 'Fernando Alonso' },
  //   },
  //   {
  //     id: 55,
  //     gp: 3,
  //     user: 1,
  //     points: 0,
  //     p10: { name: 'Sergio Pérez' },
  //     first_retirement: { name: 'Carlos Sainz' },
  //   },
  // ]
  // const gps = [
  //   {
  //     id: 4,
  //     location: 'Azerbaijan',
  //     seq: 0,
  //     date: '2023-04-30T11:00:00+00:00',
  //   },
  //   {
  //     id: 1,
  //     location: 'Miami',
  //     seq: 1,
  //     date: '2023-05-07T19:30:00+00:00',
  //   },
  //   {
  //     id: 3,
  //     location: 'Monaco',
  //     seq: 2,
  //     date: '2023-05-28T13:00:00+00:00',
  //   },
  // ]

  return {
    props,
  }
}

export default Home
