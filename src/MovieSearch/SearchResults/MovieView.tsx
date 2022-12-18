import React from "react";
import classes from "./movie-view.module.css";
import { Movie } from "../types";

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

const MovieDescriptionRow: React.FC<DescriptionItem> = ({ title, value }) => {
    return (
        <p className={classes.description}>
            <span className={classes.title}>{title}: </span>
            {value}
        </p>
    );
};

export const MovieView: React.FC<Movie> = props => {
    const descriptionItems = createDescriptionItems(props);

    return (
        <div className={classes.movie}>
            <img src={props.poster} alt={"poster"} />
            <div className={classes.description}>
                {descriptionItems.map(item => (
                    <MovieDescriptionRow key={item.title} {...item} />
                ))}
            </div>
        </div>
    );
};
