import React, { useRef } from "react";
import { SearchForm } from "./SearchForm/SearchForm";
import { SearchResults } from "./SearchResults/SearchResults";
import { createModel } from "./model";
import classes from "./movie-serach.module.css";

export const MovieSearch: React.FC = () => {
    const model = useRef(createModel());

    return (
        <div className={classes.container}>
            <SearchForm model={model.current} />
            <SearchResults $movie={model.current.$movieViewData} />
        </div>
    );
};
