import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import { langReducer } from './reducer/query'

const rootReducer = combineReducers({lang:langReducer})