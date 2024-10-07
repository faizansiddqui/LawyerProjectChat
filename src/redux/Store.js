// store.js
import { configureStore } from '@reduxjs/toolkit';
import lawyersReducer from './lawyerSlice';

const store = configureStore({
    reducer: {
        lawyers: lawyersReducer,
    },
});

export default store;
