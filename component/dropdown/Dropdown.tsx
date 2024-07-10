import {useDispatch} from 'react-redux';
import {change} from '@/store/reducer/lang';

const Dropdown = (props: { lang: { value: string, name: string }[] }): JSX.Element => {

    const dispatch = useDispatch();
    const langChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(change({lang: event.target.value}));
    };

    return (
        <select id='lang' name='lang' onChange={langChange}>
            {props.lang.map(x => (<option value={x.value} key={x.value}>{x.name}</option>))}
        </select>)
};

export default Dropdown;