import React from "react";
import classes from "./App.module.css";
import { SearchForm } from "./MovieSearch/SearchForm/SearchForm";
import { SearchResults } from "./MovieSearch/SearchResults/SearchResults";

export const App: React.FC = () => (
    <main className={classes.container}>
        <SearchForm />
        <SearchResults />
    </main>
);
