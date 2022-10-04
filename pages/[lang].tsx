import type {NextPage, GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next'
import type {NextPageWithLayout} from './_app'
import type {ReactElement} from 'react'
import {useRouter} from 'next/router'
import Nav from './common/nav'
import Footer from './common/footer'

const LangPage: NextPageWithLayout = ({contents}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const param1 = router.asPath
  const {test} = router.query

  return (
      <div>
        <span>
        {param1}
        </span>
        <span>
        {test}
      </span>
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
  let contents: String = params?.lang == 'kor' ? 'kor' : 'jp'

  return {props: {contents}}
}

LangPage.getLayout = function getLayout(page: ReactElement) {
  return (
      <div>
        <Nav/>
        {page}
        <Footer/>
      </div>
  )
}

export default LangPage