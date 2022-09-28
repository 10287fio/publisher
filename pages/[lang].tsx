import type {NextPage, GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next'
import Nav from './nav'
import Main from './main'
import Footer from './footer'
import { useState, useEffect } from 'react'

const LangPage: NextPage = ({contents}: InferGetStaticPropsType<typeof getStaticProps>) => {
  let [screenWidth, setScreenWidth] = useState(0)

  function test(){
    setScreenWidth(window.document.body.offsetWidth)
    console.log(window.document.body.offsetWidth)
  }

  return (
      <div style={{position:'relative'}}>
        <div style={{position:'absolute', width:'1000px', left:'30%'}}>
        <Nav/>
        </div>
        <div>{screenWidth}</div>
        <button onClick={test}>+</button>
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
  let contents: String = params?.lang == 'kor' ? 'kor' : 'jp'

  return {props: {contents}}
}

export default LangPage