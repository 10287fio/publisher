import type {NextPage} from "next"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import langStyles from '@/layout/styles/layout.module.scss'
import DeliveryServiceEnum from '../enums/layoutEnum'

const Nav: NextPage = () => {
  const navItems: string[] = DeliveryServiceEnum.NavItemsEnum.map((x)=> x.value)

  const navItem  = DeliveryServiceEnum.NavItemsEnum.reduce((a:{[key:string]:any}, c) => {
    a[c.value] = {name:c.value, url:c.url}
    return a
  }, {})

  return (
      <div className={langStyles.nav}>
        <div className={langStyles.navLayout}>
          <div style={{flexBasis: '100px'}}>
            <Link href="/">
                <div>
                  <Image src="https://raw.githubusercontent.com/vercel/next.js/canary/examples/image-component/public/vercel.png" width={100} height={100} layout={"responsive"} alt={"fragranceia"}/>
                </div>
            </Link>
          </div>
          <div style={{flexBasis: '50%'}}>
            <div className={langStyles.navItem}>
              {navItems.map((item) =>
                  <div key={item.toString()} style={{flexBasis: '50%', textAlign: 'center', color:'gray'}}>
                    <Link href={navItem[item].url}>{item}</Link>
                  </div>)}
            </div>
          </div>
        </div>
      </div>
  )
}

export default Nav