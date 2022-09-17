import type {NextPage} from 'next'
import Main from './main'
import Nav from './nav'

const Home: NextPage = () => {
    return (
        <div>
            <Nav />
            <Main />
        </div>
    )
}

export default Home