import type {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next'
import type {NextPageWithLayout} from '../_app'

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
                {params: {lang: 'kor'}},
                {params: {lang: 'jp'}}
            ],
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    let contents: String = ''
    switch (params?.lang) {
        case 'kor' :
            contents = 'kor';
            break;
        case 'jp' :
            contents = 'jp';
            break;
    }

    return {props: {contents}}
}

export default LangPage