import type {NextPageWithLayout} from './_app';
import commonStyle from '@/common/styles/common.module.scss'

const Home: NextPageWithLayout = () => {
    return (
        <div className={commonStyle.indexArticle}>
            It could be a ZIN to call the universe&#039;s smallest unit&#46;<br/>
            ZIN is a unit which couldn&#039;t split any more&#46;<br/>
            Zin is a unit which couldn&#039;t mix the other material&#46;<br/>
        </div>
    )
}

export default Home