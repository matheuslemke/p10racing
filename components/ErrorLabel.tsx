import { NextPage } from 'next'

interface Props {
  msg: string
}

const ErrorLabel: NextPage<Props> = ({ msg }) => {
  return msg ? <label className='text-red-800 text-xs'>{msg}</label> : <span></span>
}

export default ErrorLabel
