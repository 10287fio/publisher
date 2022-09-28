import type {NextPage} from "next"
import Image from 'next/image'
import homeImg from '../public/fragranceia.png'
import Link from 'next/link'
import React from 'react'

const Nav: NextPage = () => {
  const navItems: String[] = ["Enterprise", "ZIN:THE SMALLEST UNIT", "Feedback", "Support"];

  return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <div style={{flexBasis: '100px'}}>
          <Link href="/nav">
            <a>
              <div style={{width: "100px", height: "100px"}}>
                <Image src={homeImg} width={100} height={100} layout={"responsive"}/>
              </div>
            </a>
          </Link>
        </div>
        <div style={{flexBasis: '50%'}}>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            {navItems.map((item) =>
                <div key={item.toString()} style={{flexBasis: '50%', textAlign: 'center'}}>
                  <Link href="/">{item}</Link>
                </div>)}
          </div>
        </div>
      </div>
  )
}

export default Nav