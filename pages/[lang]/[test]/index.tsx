import type {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next'
import type {NextPageWithLayout} from '../../_app'

const TestPage: NextPageWithLayout = ({contents}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <div>{contents}</div>

}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {params: {lang: 'kor', test: 'zin'}},
            {params: {lang: 'kor', test: 'donate'}},
            {params: {lang: 'kor', test: 'book'}},
            {params: {lang: 'jp', test: 'zin'}},
            {params: {lang: 'jp', test: 'donate'}},
            {params: {lang: 'jp', test: 'book'}}
        ],
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    let contents = ''


    switch (params?.test) {
        case 'zin' :
            contents = params?.lang == 'kor' ? '가장 최소의 단위는 진입니다.' : '最も最小の単位は真です。'
            break;
        case 'donate' :
            contents = params.test;
            break;
        case 'book' :
            contents = params.test;
            break;
    }

    return {props: {contents}}
}

export default TestPage