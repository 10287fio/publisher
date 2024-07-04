import type {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next'
import type {NextPageWithLayout} from '../../_app'
import KorZin from "@/composition/lang/zin/korZin"
import JpZin from "@/composition/lang/zin/jpZin"
import KorDonate from "@/composition/lang/donate/korDonate"
import JpDonate from "@/composition/lang/donate/jpDonate"
import KorBook from "@/composition/lang/book/korBook"
import JpBook from "@/composition/lang/book/jpBook"

const DynamicPage: NextPageWithLayout = ({params}: InferGetStaticPropsType<typeof getStaticProps>) => {
    if (params.lang == 'kor') {
        switch (params.dynamic) {
            case 'zin' :
                return <KorZin/>
            case 'donate' :
                return <KorDonate/>
            case 'book' :
                return <KorBook/>
        }
    } else if (params.lang == 'jp') {
        switch (params.dynamic) {
            case 'zin' :
                return <JpZin/>
            case 'donate' :
                return <JpDonate/>
            case 'book' :
                return <JpBook/>
        }
    }
    return <div/>
}

interface dynamicPage {
    lang: string;
    test: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {params: {lang: 'kor', dynamic: 'zin'}},
            {params: {lang: 'kor', dynamic: 'donate'}},
            {params: {lang: 'kor', dynamic: 'book'}},
            {params: {lang: 'jp', dynamic: 'zin'}},
            {params: {lang: 'jp', dynamic: 'donate'}},
            {params: {lang: 'jp', dynamic: 'book'}}
        ],
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

    return {props: {params}}
}

export default DynamicPage