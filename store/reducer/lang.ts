import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit'
import {nanoid} from 'nanoid';
import {RootState} from "../../store";

interface langType {
    id: string | null
    lang: string | null
}

const initState: langType = {
    id: null,
    lang: 'default',
}

export const slice = createSlice({
    name: 'lang',
    initialState: initState,
    reducers: {
        change: {
            reducer(state, action: PayloadAction<langType>) {
                state.lang = action.payload.lang
            },
            prepare(lang: string) {
                return {
                    payload: {
                        id: nanoid(),
                        lang
                    }
                }

            }
        }
    },
})

export const langAction = slice.actions
export const selectLang = (state:RootState) => state.lang
export default slice.reducer