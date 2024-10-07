import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../firebase'; // Make sure Firebase is correctly initialized
import { addDoc, collection, getDocs, loadBundle, query, where } from 'firebase/firestore';

export const addLawyer = createAsyncThunk(
    'lawyers/addLawyer',
    async (lawyerData, { rejectWithValue }) => {
        try {
            const productRef = await addDoc(collection(db, 'lawyers'), lawyerData);
            return { id: productRef.id, ...lawyerData }; // Return the product with its ID
        }
        catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

// Fetch Lawyer Profile Data
export const fetchlawyers = createAsyncThunk(
    'lawyers/fetchlawyers',
    async (_, { rejectWithValue }) => {
        try {
            const querySnapshot = await getDocs(collection(db, 'lawyers'));
            const lawyers = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            return lawyers;
        }
        catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

// User Signup 
export const addUserLoginData = createAsyncThunk(
    'lawyers/logindata',
    async (loginUserData, { rejectWithValue }) => {
        try {
            const loginRef = await addDoc(collection(db, 'loginData'), loginUserData);
            return { id: loginRef.id, loginUserData }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const lawyersSlice = createSlice({
    name: 'lawyers',
    initialState: {
        lawyers: [],
        loading: false,
        error: null,
    },

    reducers: { /* You can add additional reducers here if needed */ },

    extraReducers: (builder) => {
        builder
            .addCase(addLawyer.pending, (state) => {
                state.loading = true;
            })
            .addCase(addLawyer.fulfilled, (state, action) => {
                state.loading = false;
                state.lawyers.push(action.payload); // Add the new product to the state
            })
            .addCase(addLawyer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Handle errors
            })
            .addCase(fetchlawyers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchlawyers.fulfilled, (state, action) => {
                state.loading = false; // Set loading to false after fetching
                state.lawyers = action.payload;
            })
            .addCase(fetchlawyers.rejected, (state, action) => {
                state.loading = false; // Set loading to false if request fails
                state.error = action.payload;
            })
            .addCase(addUserLoginData.pending, (state) => {
                state.loading = true
            })
            .addCase(addUserLoginData.fulfilled, (state, action) => {
                    state.lawyers = action.payload;
            })
            .addCase(addUserLoginData.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload;
            });

    },
});

export const selectlawyers = (state) => state.lawyers.lawyers;

export default lawyersSlice.reducer;
