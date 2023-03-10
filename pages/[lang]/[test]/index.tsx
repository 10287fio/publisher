import type {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next'
import type {NextPageWithLayout} from '../../_app'

const LangPage: NextPageWithLayout = ({contents}: InferGetStaticPropsType<typeof getStaticProps>) => {

    return (
        <div>
            {contents}
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths:
            [
                {params: {lang:'kor', test: 'enterprise'}},
                {params: {lang:'kor', test: 'zin'}},
                {params: {lang:'kor', test: 'essay'}},
                {params: {lang:'kor', test: 'feedback'}},
                {params: {lang:'kor', test: 'support'}},
                {params: {lang:'jp', test: 'enterprise'}},
                {params: {lang:'jp', test: 'zin'}},
                {params: {lang:'jp', test: 'essay'}},
                {params: {lang:'jp', test: 'feedback'}},
                {params: {lang:'jp', test: 'support'}},
            ],
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    let contents: String = ''
    switch (params?.test) {
        case 'enterprise': contents = 'enterprise'; break;
        case 'essay' : contents = 'essay'; break;
    }

    return {props: {contents}}
}

export default LangPage