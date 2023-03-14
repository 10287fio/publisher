import {NextPageWithLayout} from "../../pages/_app"
import dropdownStyle from '@/components/dropdown/dropdown.module.scss'
import {NextPage} from "next";

interface test {

}
const dropdown  = (props: { aaa:string;} ) : JSX.Element => (
    <div className={dropdownStyle.header}>test{props.aaa}</div>
)

export default dropdown