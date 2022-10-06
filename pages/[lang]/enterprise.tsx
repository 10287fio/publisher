import {useRouter} from "next/router"
import EnterpriseStyle from './styles/enterprise.module.scss'

type Props = {
  lang : String
}

const Enterprise = ({lang} : Props) => {
  const router = useRouter()
  const param1 = router.asPath
  const {test} = router.query

  return <div className={EnterpriseStyle.body}>enterprise</div>

}

export default Enterprise