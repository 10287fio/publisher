import {ReactNode} from 'react';
import layoutStyles from '@/composition/layout/styles/layout.module.scss';
import Nav from "@/composition/layout/nav";
import Footer from '@/composition/layout/footer';

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
);

export default Layout;