// /src/store.js

import { configureStore } from '@reduxjs/toolkit';
import lawyersReducer from '../redux/lawyerSlice';
import chatReducer from '../redux/chatSlice';

const store = configureStore({
    reducer: {
        lawyers: lawyersReducer,
        chat: chatReducer,
    },
});

export default store;
