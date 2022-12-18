import React from "react";
import classes from "./search-form.module.css";
import { createEffect, createEvent, createStore, sample } from "effector";
import { useUnit } from "effector-react";
import { Field } from "./Field/Field";
import { clearForm } from "./events";
import { fetchMovie } from "../api";
import { Movie } from "../types";

export const searchMovieFx = createEffect<FormState, Movie, Error>(
    ({ search }) => fetchMovie(search)
);

export type FormState = {
    readonly search: string;
};

const setField = createEvent<{
    readonly key: keyof FormState;
    readonly value: string;
}>("setField");

const submitted = createEvent<React.FormEvent<HTMLFormElement>>("submitted");

const $form = createStore<FormState>({ search: "" })
    .on(setField, (state, { key, value }) => ({ ...state, [key]: value }))
    .reset(clearForm);

const $canClear = $form.map(state => state.search !== "");

const $canSubmit = $form.map(state => state.search.length > 2);

sample({
    clock: submitted,
    source: $form,
    target: searchMovieFx
});

const ClearButton: React.FC = () => {
    return (
        <button
            type="button"
            className={classes.clearButton}
            onClick={() => clearForm()}
        >
            Clear
        </button>
    );
};

const SubmitButton: React.FC = () => {
    const canSubmit = useUnit($canSubmit);

    return (
        <button type="submit" disabled={!canSubmit}>
            Search
        </button>
    );
};

export const SearchForm: React.FC = () => {
    const state = useUnit($form);
    const canClear = useUnit($canClear);

    return (
        <form className={classes.form} onSubmit={submitted}>
            <Field
                className={classes.field}
                name={"search"}
                placeHolder={"Search movie..."}
                value={state.search}
                onChange={value => setField({ key: "search", value })}
                autoFocus={true}
            >
                {canClear && <ClearButton />}
            </Field>
            <SubmitButton />
        </form>
    );
};

submitted.watch(event => {
    event.preventDefault();
});
