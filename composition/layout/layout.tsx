import Footer from './footer'
import layoutStyles from '@/composition/layout/styles/layout.module.scss'
import {ReactNode} from 'react';
import Nav from "@/composition/layout/nav";

const Layout = (page?: { children: ReactNode }) => (
    <div>
        <div className={layoutStyles.wrapper}>
            <Nav/>
            <div className={layoutStyles.body}>
                {page?.children}
            </div>
        </div>
        <Footer/>
    </div>
)

export default Layout