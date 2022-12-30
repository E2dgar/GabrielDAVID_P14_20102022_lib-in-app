import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ROUTES } from '../../constants/api';
import data from '../../__mocked/data.json';
import { get } from '../../api/http';

type StateTypes = {
    status: string;
    error: boolean | null;
    data: any[];
};
const initialState: StateTypes = {
    status: 'idle',
    error: null,
    data: []
};
export const getEmployees = createAsyncThunk(
    'employees/getEmployees',
    async () => {
        const response = await fetch(ROUTES.ROWS100, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }
);
const employeesSlice = createSlice({
    name: 'employees',
    initialState: initialState,
    reducers: {
        addEntrie: (state, action) => {
            state.data.push(action.payload);
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getEmployees.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getEmployees.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.data = action.payload;
            });
    }
});

export const { addEntrie } = employeesSlice.actions;

export default employeesSlice.reducer;
