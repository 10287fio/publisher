import type {NextPage, GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next'
import Nav from './nav'
import Main from './main'
import Footer from './footer'
import langStyles from './lang.module.scss'
import type {NextPageWithLayout} from './_app'
import type {ReactElement} from 'react'

const LangPage: NextPageWithLayout = ({contents}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
      <div>
        <div className={langStyles.nav}>
          <Nav/>
        </div>
        <div className={langStyles.main}>
          <Main/>
        </div>
        <div className={langStyles.footer}>
          <Footer/>
        </div>
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

LangPage.getLayout = function getLayout(page:ReactElement){
  return (
      <div>
        test Layout
        {page}
      </div>
  )
}

export default LangPage