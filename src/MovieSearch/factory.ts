import {
    combine,
    createEffect,
    createEvent,
    createStore,
    restore,
    sample
} from "effector";
import { modelFactory } from "effector-factorio";
import { KeyboardEvent } from "react";
import { Movie, SearchResult } from "./types";
import { fetchMovie } from "./api";
import { cacheDecorator } from "../utils/cache";

export const factory = modelFactory(() => {
    const clear = createEvent();

    const inputChanged = createEvent<string>();

    const keyPressed = createEvent<KeyboardEvent>();

    const enterPressed = keyPressed.filter({
        fn: event => event.key === "Enter"
    });

    const escapePressed = keyPressed.filter({
        fn: event => event.key === "Escape"
    });

    const searchPressed = createEvent();

    const $input = createStore("")
        .on(inputChanged, (_, input) => input)
        .reset(clear);

    const $canSearch = $input.map(input => input.length > 2);

    const fetchMovieCached = cacheDecorator(fetchMovie);

    const searchMovieFx = createEffect<string, Movie, Error>(input =>
        fetchMovieCached(input)
    );

    const $movie = restore<Movie>(searchMovieFx.doneData, null).reset(clear);

    const $canClear = $movie.map(movie => movie !== null);

    const $movieSearchError = restore<Error>(
        searchMovieFx.failData,
        null
    ).reset(clear, searchMovieFx);

    const $movieSearchResult = combine(
        {
            loading: searchMovieFx.pending,
            error: $movieSearchError,
            data: $movie
        },
        ({ loading, error, data }): SearchResult<Movie> | null => {
            if (loading) return { type: "loading" };
            if (error !== null) return { type: "error" };
            if (data !== null) return { type: "data", data };
            return null;
        }
    );

    sample({
        clock: [searchPressed, enterPressed],
        source: [$input, $canSearch] as const,
        filter: ([, canSearch]) => canSearch,
        fn: ([input]) => input,
        target: searchMovieFx
    });

    sample({
        clock: escapePressed,
        source: $movie,
        filter: movie => movie !== null,
        fn: () => null,
        target: clear
    });

    return {
        $input,
        $canSearch,
        $movieSearchResult,
        $canClear,
        inputChanged,
        searchPressed,
        clear,
        keyPressed,
        searchMovieFx
    };
});
