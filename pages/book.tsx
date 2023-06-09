import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '../store';

type Props = {
    lang: String
}

const Feedback = () => {

    const customUseSelector: TypedUseSelectorHook<RootState> = useSelector
    const lang = customUseSelector(state => state.lang)
    return <div>buy ZIN</div>

}

export default Feedback