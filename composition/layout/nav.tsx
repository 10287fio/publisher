import type {NextPage} from 'next'
import Image from 'next/image'
import React from 'react'
import layoutStyles from '@/composition/layout/styles/layout.module.scss'
import NavItemsLang from "@/store/enum/layoutEnum"
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {RootState} from "@/store"
import fragranceiaImg from "@/resource/Fragranceia.png"
import Dropdown from "@/component/dropdown/Dropdown";
import ManyLang from "@/store/enum/manyLang";
import Link from "next/link";
import {router} from "next/client";
import {redirect} from "next/navigation";

const Nav: NextPage = () => {
    const customUseSelector: TypedUseSelectorHook<RootState> = useSelector
    const lang = customUseSelector(state => state.lang.lang)
    const navItems = NavItemsLang.filter(x => x.lang == (lang ?? 'en'))
    const navItemsLang = navItems.reduce((a: { [key: string]: any }, c) => {
        a[c.key] = {name: c.value, url: c.url}
        return a
    }, {})
    const home = () => {
        redirect('/')
    }

    return (
        <div className={layoutStyles.nav}>
            <div className={layoutStyles.navLayout}>
                <div className={layoutStyles.navItemHome}>
                    {/*<div onClick={home} style={{cursor: 'pointer'}}>*/}
                    <Link href={"/"}>
                        <Image
                            src={fragranceiaImg}
                            width={100} height={100} alt={'Fragranceia'} priority={false} placeholder="empty"/>
                    {/*</div>*/}
                    </Link>
                </div>
                <div className={layoutStyles.navMargin1}></div>
                <div className={layoutStyles.navItem}>
                    {navItems.map((item) =>
                        <div key={item.key.toString()}>
                            <Link href={navItemsLang[item.key].url}>{item.value}</Link>
                        </div>)}
                </div>
                <div className={layoutStyles.navMargin2}></div>
                <div className={layoutStyles.navItemLang}>
                    <Dropdown lang={ManyLang}/>
                </div>
            </div>
        </div>
    )
}

export default Nav