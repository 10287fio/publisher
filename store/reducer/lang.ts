import {createSlice, nanoid} from '@reduxjs/toolkit';
import {RootState} from "../../store";

interface langType {
    id : string,
    lang: string | null
}

const initState: langType = {
    id:nanoid(),
    lang: 'default',
}

export const slice = createSlice({
    name: 'lang',
    initialState: initState,
    reducers: {
        // change: (state) => state.lang='kor'
    },
})

export const langAction = slice.actions
export const selectLang = (state:RootState) => state.lang
export default slice.reducer