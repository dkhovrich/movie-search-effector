import React from "react";
import { combine, restore } from "effector";
import { searchMovieFx } from "../SearchForm/SearchForm";
import { useUnit } from "effector-react/effector-react.umd";
import { Movie } from "../types";
import classes from "./search-results.module.css";

const $movieGetStatus = combine({
    loading: searchMovieFx.pending,
    error: restore<Error>(searchMovieFx.failData, null),
    data: restore<Movie>(searchMovieFx.doneData, null)
});

type DescriptionItem = {
    readonly title: string;
    readonly value: string;
};

const createDescriptionItems = (movie: Movie): readonly DescriptionItem[] => [
    { title: "Title", value: movie.title },
    { title: "Year", value: movie.year.toString() },
    { title: "Released", value: movie.released.toString() },
    { title: "Runtime", value: movie.runtime },
    { title: "Genre", value: movie.genre },
    { title: "Director", value: movie.director },
    { title: "Actors", value: movie.actors.join(", ") },
    { title: "Plot", value: movie.plot }
];

export const SearchResults: React.FC = () => {
    const { loading, error, data } = useUnit($movieGetStatus);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Movie not found!</div>;
    }
    if (data == null) {
        return null;
    }

    const descriptionItems = createDescriptionItems(data);

    return (
        <div className={classes.movie}>
            <img src={data.poster} alt={"poster"} />
            <div className={classes.description}>
                {descriptionItems.map(item => (
                    <p key={item.title} className={classes.description}>
                        <span className={classes.title}>{item.title}: </span>
                        {item.value}
                    </p>
                ))}
            </div>
        </div>
    );
};
