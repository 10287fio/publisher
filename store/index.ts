import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {createWrapper, HYDRATE} from 'next-redux-wrapper'
import langReducer from './reducer/lang'

export const store = configureStore(
    {
        reducer: (state, action) => {
            switch (action.type) {
                case HYDRATE :
                    return {...state, ...action.payload}
                default:
                    return combineReducers({lang: langReducer})(state, action)
            }
        },
        devTools: process.env.NODE_ENV !== 'production',
    }
);

export const makeStore =　() => {
    return store
}

export type RootState = ReturnType<typeof store.getState>
export default createWrapper(makeStore, {debug: process.env.NODE_ENV === 'development'})
