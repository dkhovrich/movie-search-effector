import React from "react";
import { combine, restore } from "effector";
import { searchMovieFx } from "../SearchForm/SearchForm";
import { useUnit } from "effector-react/effector-react.umd";
import { Movie } from "../types";
import { MovieView } from "./MovieView";

const $movieGetStatus = combine({
    loading: searchMovieFx.pending,
    error: restore<Error>(searchMovieFx.failData, null),
    data: restore<Movie>(searchMovieFx.doneData, null)
});

export const SearchResults: React.FC = () => {
    const { loading, error, data } = useUnit($movieGetStatus);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Movie not found!</div>;
    }
    if (data != null) {
        return <MovieView {...data} />;
    }
    return null;
};
