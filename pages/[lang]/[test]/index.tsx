import type {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next'
import type {NextPageWithLayout} from '../../_app'

const TestPage: NextPageWithLayout = ({contents}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <div>{contents}</div>

}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {params: {lang: 'kor', test: 'zin'}},
            {params: {lang: 'kor', test: 'intro'}},
            {params: {lang: 'kor', test: 'donate'}},
            {params: {lang: 'kor', test: 'book'}},
            {params: {lang: 'jp', test: 'zin'}},
            {params: {lang: 'jp', test: 'intro'}},
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
            contents = params.test;
            break;
        case 'intro' :
            contents = params.test;
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