import React from "react";
import { Movie } from "../types";
import classes from "./search-results.module.css";
import { factory } from "../factory";
import { absurd } from "../../utils/absurd";
import { useStore } from "effector-react";

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

const MovieView: React.FC<Movie> = movie => {
    const descriptionItems = createDescriptionItems(movie);

    return (
        <div className={classes.movie}>
            <img src={movie.poster} alt={"poster"} />
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

export const SearchResults: React.FC = () => {
    const model = factory.useModel();
    const movie = useStore(model.$movieSearchResult);

    if (movie === null) return null;

    switch (movie.type) {
        case "loading":
            return <div>Loading...</div>;
        case "error":
            return <div>Movie not found!</div>;
        case "data":
            return <MovieView {...movie.data} />;
        default:
            return absurd(movie);
    }
};
