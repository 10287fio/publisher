import Nav from './nav'
import Footer from './footer'
import {ReactElement, ReactNode} from "react";

type Props = {
  children?: ReactNode
}

const Layout = (page: ReactElement) => (
    <div>
      <Nav/>
      {page}
      <Footer/>
    </div>
)

export default Layout