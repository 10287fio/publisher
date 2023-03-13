import type {NextPageWithLayout} from "./_app";
import Dropdown from "../components/dropdown/Dropdown"

const Home: NextPageWithLayout = () => {
  return (
      <div style={{textAlign:"center"}}>
          <Dropdown aaa="aaaaa"></Dropdown>
      </div>
  )
}

export default Home