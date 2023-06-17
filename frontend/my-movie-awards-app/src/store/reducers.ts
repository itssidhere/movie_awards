// src/store/reducers.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface AppState {
    movies: Movie[];
    savedMovies: Movie[];
}

const initialState: AppState = {
    movies: [],
    savedMovies: [],
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setMovies(state, action: PayloadAction<Movie[]>) {
            state.movies = action.payload;
        },
        setSavedMovies(state, action: PayloadAction<Movie[]>) {
            state.savedMovies = action.payload;
        },
        addSavedMovie(state, action: PayloadAction<Movie>) {
            state.savedMovies.push(action.payload);
        },
        removeSavedMovie(state, action: PayloadAction<string>) {
            state.savedMovies = state.savedMovies.filter(
                (movie) => movie.imdb_id !== action.payload
            );
        },
    },
});

export const { setMovies, addSavedMovie, removeSavedMovie, setSavedMovies } = appSlice.actions;

export default appSlice.reducer;
