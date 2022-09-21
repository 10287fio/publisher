import type {NextPage} from "next"
import Image from 'next/image'
import homeImg from '../public/fragranceia.png'
import Link from 'next/link'

const Nav: NextPage = () => {
  return (
      <div style={{display: "inline"}}>
        <Link href="/nav">
          <a>
            <div style={{position:'relative', display: "inline-block", width: "30px", height: "30px"}}>
              <Image src={homeImg} width={200} height={200} layout={"fill"}/>
            </div>
          </a>
        </Link>
        <div style={{display: "inline-block", color: 'red', fontSize: '10px'}}>Nav1</div>
        <div style={{display: "inline-block", color: 'blue', fontSize: '10px'}}>Nav2</div>
      </div>
  )
}


export default Nav