import type {NextPage} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import layoutStyles from '@/layout/styles/layout.module.scss'
import NavItemsLang from '../enums/layoutEnum'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import type {RootState} from '../store'
import Dropdown from '../components/dropdown/Dropdown'
import ManyLang from '../enums/manyLang';


const Nav: NextPage = () => {
    const customUseSelector: TypedUseSelectorHook<RootState> = useSelector
    const lang = customUseSelector(state => state.lang.lang)
    const navItems = NavItemsLang.NavItemsLang.filter(x => x.lang == (lang ?? 'en'))
    const navItemsLang = navItems.reduce((a: { [key: string]: any }, c) => {
        a[c.key] = {name: c.value, url: c.url}
        return a
    }, {})

    return (
        <div className={layoutStyles.nav}>
            <div className={layoutStyles.navLayout}>
                <div className={layoutStyles.navItemHome}>
                    <div style={{cursor: 'pointer'}}>
                        <Image
                            src='/fragranceia.png'
                            width={100} height={100} layout={'responsive'} alt={'fragranceia'}/>
                    </div>
                </div>
                <div className={layoutStyles.navMargin1}></div>
                <div className={layoutStyles.navItem}>
                </div>
                <div className={layoutStyles.navMargin2}></div>
                <div className={layoutStyles.navItemLang}>
                </div>
            </div>
        </div>
    )
}

export default Nav