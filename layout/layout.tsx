import Nav from './nav'
import Footer from './footer'
import layoutStyles from '@/layout/styles/layout.module.scss'
import {ReactElement} from 'react';

const Layout = (page: ReactElement) => (
    <div>
        <div className={layoutStyles.wrapper}>
            <Nav/>
            <div className={layoutStyles.body}>
                {page}
            </div>
        </div>
        <Footer/>
    </div>
)

export default Layout