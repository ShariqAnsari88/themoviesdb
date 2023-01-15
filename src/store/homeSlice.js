import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: "home",
    initialState: {
        popular: [],
        url: {},
        genres: {},
    },
    reducers: {
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        getPopular: (state, action) => {
            state.popular = action.payload;
        },
        getGenres: (state, action) => {
            state.genres = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { getPopular, getApiConfiguration, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
