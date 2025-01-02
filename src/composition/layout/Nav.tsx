import React from 'react';
import type {NextPage} from 'next';
import Image from 'next/image';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '@/store';
import LangEnum from '@/store/enum/lang.enum';
import Link from 'next/link';
import {redirect} from 'next/navigation';
import layoutStyles from '@/composition/layout/Layout.module.scss';
import NavEnum from '@/store/enum/nav.enum';
import fragranceiaImg from '@/resource/Fragranceia.png';
import Dropdown from '@/component/dropdown/Dropdown';

const Nav: NextPage = () => {
    const customUseSelector: TypedUseSelectorHook<RootState> = useSelector;
    const lang = customUseSelector(state => state.lang.lang);
    const navItems = NavEnum.filter(x => x.lang == (lang ?? 'en'));
    const navItemsLang = navItems.reduce((a: { [key: string]: any }, c) => {
        a[c.key] = {name: c.value, url: c.url}
        return a
    }, {});
    const home = () => {
        redirect('/')
    };

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
                    <Dropdown lang={LangEnum}/>
                </div>
            </div>
        </div>
    )
};

export default Nav;