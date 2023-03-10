import type {NextPage} from "next"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import langStyles from '@/layout/styles/layout.module.scss'
import DeliveryServiceEnum from '../enums/layoutEnum'
import {useRouter} from "next/router";

const Nav: NextPage = () => {
  const router = useRouter()
  const lang = router.query.lang
    const navItems = DeliveryServiceEnum.NavItemsLang.filter(x => x.lang == (lang ?? 'default'))
    const navItemsLang = navItems.reduce((a:{[key:string]:any}, c) => {
        a[c.key] = {name:c.value, url:c.url}
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
              {navItems.map((item ) =>
                  <div key={item.key.toString()} style={{flexBasis: '50%', textAlign: 'center', color:'gray'}}>
                    <Link href={navItemsLang[item.key].url}>{item.value}</Link>
                  </div>)}
            </div>
          </div>
        </div>
      </div>
  )
}

export default Nav