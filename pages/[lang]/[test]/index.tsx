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
                {params: {lang:'jp', test: 'essay'}}
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