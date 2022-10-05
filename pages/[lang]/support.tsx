import type {NextPage} from 'next'
import {useRouter} from "next/router"

type Props = {
  lang : String
}

const Support = ({lang} : Props) => {
  const router = useRouter()
  const param1 = router.asPath
  const {test} = router.query

  return <div>support</div>

}

export default Support