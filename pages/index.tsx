import type {NextPageWithLayout} from "./_app";
import Dropdown from "../components/dropdown/Dropdown"
import ManyLang from "../enums/manyLang";

const Home: NextPageWithLayout = () => {
  return (
      <div style={{textAlign:"center"}}>
          <Dropdown lang={ManyLang.ManyLang}></Dropdown>

      </div>
  )
}

export default Home