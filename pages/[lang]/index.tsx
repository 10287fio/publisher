import type {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next'
import type {NextPageWithLayout} from '../_app'
import KorIndex from '../../dynamicPages/lang/index/korIndex'
import JpIndex from '../../dynamicPages/lang/index/jpIndex'

const LangPage: NextPageWithLayout = ({params}: InferGetStaticPropsType<typeof getStaticProps>) => {
    if(params.lang == 'kor'){
        return <KorIndex/>
    } else if(params.lang == 'jp'){
        return <JpIndex/>
    }
    return <div/>
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths:
            [
                {params: {lang: 'kor'}},
                {params: {lang: 'jp'}}
            ],
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

    return {props: {params}}
}

export default LangPage