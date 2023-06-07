import {createSlice, nanoid} from '@reduxjs/toolkit';
import {RootState} from "../../store";

interface langType {
    lang: string | null
}

const initState: langType = {
    lang: 'default',
}

export const slice = createSlice({
    name: 'lang',
    initialState: initState,
    reducers: {
        change: (state, action) => {console.log(action); state.lang=action.payload.lang;}
    },
})

export const {change} = slice.actions
export const selectLang = (state:RootState) => state.lang
export default slice.reducer