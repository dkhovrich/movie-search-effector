import React from "react";
import { SearchForm } from "./SearchForm/SearchForm";
import { SearchResults } from "./SearchResults/SearchResults";
import { factory } from "./factory";
import classes from "./movie-serach.module.css";
import { modelView } from "effector-factorio";

const MovieSearchView = modelView(factory, () => {
    return (
        <div className={classes.container}>
            <SearchForm />
            <SearchResults />
        </div>
    );
});

export const MovieSearch = { factory, View: MovieSearchView };
