import type {NextPage} from "next"
import Image from 'next/image'
import homeImg from '../public/fragranceia.png'

const Nav: NextPage = () => {
  return (
      <div>
        <Image src={homeImg} width={150} height={1000} layout={"fixed"}/>
        <div>Nav</div>
      </div>
  )
}


export default Nav