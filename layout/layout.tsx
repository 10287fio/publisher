import Nav from './nav'
import Footer from './footer'
import layoutStyles from '@/layout/styles/layout.module.scss'
import {ReactNode} from 'react';

const Layout = (page?: {children:ReactNode}) => (
    <div>
        <div className={layoutStyles.wrapper}>
            <div>test1</div>
            <div className={layoutStyles.body}>
                {page?.children}
            </div>
        </div>
        <Footer/>
    </div>
)

export default Layout