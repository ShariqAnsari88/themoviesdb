import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        popularMovies: [],
        apiConfiguration: {},
    },
    reducers: {
        getApiConfiguration: (state, action) => {
            state.apiConfiguration = action.payload;
            // return {...state, ...action.payload };
        },
        getPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
            // return [...action.payload];
        },
    },
});

// Action creators are generated for each case reducer function
export const { getPopularMovies, getApiConfiguration } = homeSlice.actions;

export default homeSlice.reducer;
