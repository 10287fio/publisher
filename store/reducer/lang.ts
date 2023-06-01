import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {nanoid} from 'nanoid';
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
    },
})

export const langAction = slice.actions
export const selectLang = (state:RootState) => state.lang
export default slice.reducer