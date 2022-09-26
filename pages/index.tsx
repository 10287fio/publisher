import type {NextPage} from 'next'
import Nav from './nav'
import Main from './main'
import Footer from './footer'

const Home: NextPage = () => {
    return (
        <div>
          <Nav />
          <Main />
          <Footer />
        </div>
    )
}

export default Home