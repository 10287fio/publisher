import type {NextPage} from "next"
import Image from 'next/image'
import homeImg from '../public/fragranceia.png'
import Link from 'next/link'

const Nav: NextPage = () => {
  return (
      <div style={{display:"inline-block"}}>
        <Link href="/nav">
          <a>
            <div style={{display:"inline-block", width:"100px", height:"100px"}}>
              <Image src={homeImg} width={200} height={200} layout={"fixed"}/>
            </div>
          </a>
        </Link>
        <div>Nav</div>
      </div>
  )
}


export default Nav