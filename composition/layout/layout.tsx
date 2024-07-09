import Footer from './footer'
import layoutStyles from '@/composition/layout/styles/layout.module.scss'
import {ReactNode} from 'react';
import Nav from "@/composition/layout/nav";
import Dropdown from "@/component/dropdown/Dropdown";
import ManyLang from "@/store/enum/manyLang";

const Layout = (page?: { children: ReactNode }) => (
    <div>
        <div className={layoutStyles.wrapper}>
            <div><Nav/></div>
            <div><Dropdown lang={ManyLang}/></div>
            <div className={layoutStyles.body}>
                {page?.children}
            </div>
        </div>
        <Footer/>
    </div>
)

export default Layout