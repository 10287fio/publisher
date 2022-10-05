import type {NextPage} from 'next'
import {useRouter} from "next/router"

type Props = {
  lang : String
}

const Enterprise = ({lang} : Props) => {
  const router = useRouter()
  const param1 = router.asPath
  const {test} = router.query

  return <div>enterprise</div>

}

export default Enterprise