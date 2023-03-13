import {NextPageWithLayout} from "../../pages/_app"
import dropdownStyle from '@/components/dropdown/dropdown.module.scss'
import {NextPage} from "next";

interface test {
    aaa:string;
}
const dropdown = (props:test) => (
    <div className={dropdownStyle.header}>test{props.aaa}</div>
)

export default dropdown