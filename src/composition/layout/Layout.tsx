import {ReactNode} from 'react';
import layoutStyles from '@/composition/layout/styles/Layout.module.scss';
import Nav from "@/composition/layout/Nav";
import Footer from "@/composition/layout/Footer";

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