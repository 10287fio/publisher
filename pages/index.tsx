import Nav from './common/nav'
import Footer from './common/footer'
import type {NextPageWithLayout} from "./_app";
import type {ReactElement} from 'react'

const Home: NextPageWithLayout = () => {
  return (
      <div>
        index
      </div>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
      <div>
        <Nav/>
        {page}
        <Footer/>
      </div>
  )
}

export default Home