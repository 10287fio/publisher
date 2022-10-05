import type {NextPage} from 'next'
import {useRouter} from "next/router"

type Props = {
  lang : String
}

const Zin = ({lang} : Props) => {
  const router = useRouter()
  const param1 = router.asPath
  const {test} = router.query

  return <div>zin</div>

}

export default Zin