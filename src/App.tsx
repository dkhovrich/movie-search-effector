import React from "react";
import { MovieSearch } from "./MovieSearch/MovieSearch";

const movieSearchModel = MovieSearch.factory.createModel();

export const App: React.FC = () => (
    <main>
        <MovieSearch.View model={movieSearchModel} />
    </main>
);
