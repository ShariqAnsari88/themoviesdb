import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        popularMovies: [],
        url: {},
    },
    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        getPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { getPopularMovies, getApiConfiguration } = homeSlice.actions;

export default homeSlice.reducer;
