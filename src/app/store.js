import { configureStore } from '@reduxjs/toolkit'
import calculatorReducer from '../Features/calculator/calculatorSlice';
export default configureStore({
    reducer: {
        'calculator': calculatorReducer
    }
})