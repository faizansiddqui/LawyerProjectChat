// /src/redux/chatSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase'; // Assume Firebase is correctly initialized
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';

export const loadMessages = createAsyncThunk(
    'chat/loadMessages',
    async (_, { rejectWithValue }) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'messages'));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (text, { rejectWithValue }) => {
        try {
            const newMessage = {
                senderName: 'Current User', // Change as needed
                text,
                timestamp: serverTimestamp(),
            };
            await addDoc(collection(db, 'messages'), newMessage);
            return newMessage;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(loadMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload);
            });
    },
});

export default chatSlice.reducer;
