import React from "react";
import { SearchInput } from "./SearchForm/SearchInput";
import { SearchResults } from "./SearchResults/SearchResults";
import { factory } from "./factory";
import classes from "./movie-serach.module.css";
import { modelView } from "effector-factorio";
import { useUnit } from "effector-react";

const Clear: React.FC = () => {
    const model = factory.useModel();
    const canClear = useUnit(model.$canClear);

    return canClear ? (
        <button
            type="button"
            className={classes.clearButton}
            onClick={() => model.clear()}
        >
            Clear
        </button>
    ) : null;
};

const MovieSearchView = modelView(factory, () => {
    return (
        <div className={classes.container}>
            <SearchInput />
            <SearchResults />
            <Clear />
        </div>
    );
});

export const MovieSearch = { factory, View: MovieSearchView };
