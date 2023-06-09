import Nav from './nav'
import Footer from './footer'
import {ReactElement} from 'react';

const Layout = (page: ReactElement) => (
    <div>
        <Nav/>
        {page}
        <Footer/>
    </div>
)

export default Layout