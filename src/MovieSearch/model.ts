import {
    combine,
    createEffect,
    createEvent,
    createStore,
    restore,
    sample
} from "effector";
import { FormEvent, KeyboardEvent } from "react";
import { Movie } from "./types";
import { fetchMovie } from "./api";

export type FormState = {
    readonly search: string;
};

export function createModel() {
    const setField = createEvent<{
        readonly key: keyof FormState;
        readonly value: string;
    }>("setField");

    const submitted = createEvent<FormEvent<HTMLFormElement>>("submitted");

    const clearForm = createEvent("clearForm");

    const keyPressed = createEvent<KeyboardEvent>("keyPressed");

    const $form = createStore<FormState>({ search: "" })
        .on(setField, (state, { key, value }) => ({ ...state, [key]: value }))
        .reset(clearForm);

    const $canClear = $form.map(state => state.search !== "");

    const $canSubmit = $form.map(state => state.search.length > 2);

    const searchMovieFx = createEffect<FormState, Movie, Error>(({ search }) =>
        fetchMovie(search)
    );

    const $movie = createStore<Movie | null>(null)
        .on(searchMovieFx.doneData, (_, payload) => payload)
        .reset(clearForm);

    const $movieViewData = combine({
        loading: searchMovieFx.pending,
        error: restore<Error>(searchMovieFx.failData, null),
        data: $movie
    });

    sample({
        clock: submitted,
        source: $form,
        target: searchMovieFx
    });

    sample({
        clock: keyPressed,
        filter: event => event.key === "Escape",
        target: clearForm
    });

    submitted.watch(event => {
        event.preventDefault();
    });

    return {
        $form,
        $canClear,
        $canSubmit,
        $movieViewData,
        setField,
        submitted,
        clearForm,
        keyPressed,
        searchMovieFx
    };
}

export type Model = ReturnType<typeof createModel>;
