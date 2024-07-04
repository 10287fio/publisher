import type {NextPageWithLayout} from './_app';
import commonStyle from '@/style/styles/common.module.scss'

const Home: NextPageWithLayout = () => {
    return (
        <div className={commonStyle.indexArticle}>
            It could be a ZIN to call the universe&#039;s smallest unit.<br/>
            ZIN is a unit which couldn&#039;t split any more.<br/>
            Zin is a unit which couldn&#039;t mix the other material.<br/>
        </div>
    )
}

export default Home