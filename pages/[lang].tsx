import type {NextPage, GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next'
import Nav from './nav'
import Main from './main'
import Footer from './footer'

const LangPage: NextPage = ({lang}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
      <div>
        <Nav/>
        {lang}
        <Main/>
        <Footer/>
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
  let lang: String = params?.lang == 'kor' ? 'kor' : 'jp'

  return {props: {lang}}
}

export default LangPage