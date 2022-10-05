import type {NextPage} from "next"
import Image from 'next/image'
import homeImg from '../public/fragranceia.png'
import Link from 'next/link'
import React from 'react'
import langStyles from '@/layout/styles/layout.module.scss'

const Nav: NextPage = () => {
  const navItems: string[] = ["Enterprise", "ZIN:THE SMALLEST UNIT", "Feedback", "Support"]

  const navUrl : {value:string, url:string}[]= [
    {value:"Enterprise" , url: "/kor/enterprise"}
    , {value:"ZIN:THE SMALLEST UNIT", url:"/kor/zin"}
    , {value:"Feedback", url : "/kor/feedback"}
    , {value:"Support", url : "/kor/support"}
  ]

  const navItem  = navUrl.reduce((a:{[key:string]:any}, c) => {
    a[c.value] = {name:c.value, url:c.url}
    return a
  }, {})

  return (
      <div className={langStyles.nav}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center'
        }}>
          <div style={{flexBasis: '100px'}}>
            <Link href="/">
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
                    <Link href={navItem[item].url}>{item}</Link>
                  </div>)}
            </div>
          </div>
        </div>
      </div>
  )
}

export default Nav