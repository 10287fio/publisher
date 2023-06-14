import type {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next'
import type {NextPageWithLayout} from '../_app'
import ReactDOMServer from 'react-dom/server'
import KorIndex from '../../dynamicPages/lang/index/korIndex'
import JpIndex from '../../dynamicPages/lang/index/jpIndex'
import parse from 'html-react-parser'


const LangPage: NextPageWithLayout = ({contents}: InferGetStaticPropsType<typeof getStaticProps>) => {

    return (
        <div>
            {parse(contents)}
        </div>
    )
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
    let contents = ReactDOMServer.renderToString(<div></div>)
    switch (params?.lang) {
        case 'kor' :
            contents = ReactDOMServer.renderToString(<KorIndex/>)
            break;
        case 'jp' :
            contents = ReactDOMServer.renderToString(<JpIndex/>)
            break;
    }

    return {props: {contents}}
}

export default LangPage