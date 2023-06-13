import Nav from './nav'
import Footer from './footer'
import {ReactElement} from 'react';

const Layout = (page: ReactElement) => (
    <div>
        <Nav/>
        <div style={{paddingTop:'85px'}}>
        {page}
        </div>
        <Footer/>
    </div>
)

export default Layout