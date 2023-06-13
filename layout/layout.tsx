import Nav from './nav'
import Footer from './footer'
import langStyles from '@/layout/styles/layout.module.scss'
import {ReactElement} from 'react';

const Layout = (page: ReactElement) => (
    <div>
        <div className={langStyles.wrapper}>
            <Nav/>
            <div style={{paddingTop: '85px'}}>
                {page}
            </div>
        </div>
        <Footer/>
    </div>
)

export default Layout