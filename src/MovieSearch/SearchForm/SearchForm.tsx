import React from "react";
import classes from "./search-form.module.css";
import { useUnit } from "effector-react";
import { Field } from "./Field";
import { Model } from "../model";

type ClearButtonProps = {
    readonly onClick: () => void;
};

const ClearButton: React.FC<ClearButtonProps> = props => {
    return (
        <button
            type="button"
            className={classes.clearButton}
            onClick={props.onClick}
        >
            Clear
        </button>
    );
};

type SubmitButtonProps = {
    readonly disabled?: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps> = props => {
    return (
        <button type="submit" disabled={props.disabled}>
            Search
        </button>
    );
};

export type Props = {
    readonly model: Model;
};

export const SearchForm: React.FC<Props> = ({ model }) => {
    const state = useUnit(model.$form);
    const canClear = useUnit(model.$canClear);
    const canSubmit = useUnit(model.$canSubmit);

    return (
        <form
            tabIndex={-1}
            className={classes.form}
            onSubmit={model.submitted}
            onKeyDown={model.keyPressed}
        >
            <Field
                className={classes.field}
                name={"search"}
                placeHolder={"Search movie..."}
                value={state.search}
                onChange={value => model.setField({ key: "search", value })}
                focusOnMount={true}
                focusOnEvent={model.clearForm}
            >
                {canClear && <ClearButton onClick={() => model.clearForm()} />}
            </Field>
            <SubmitButton disabled={!canSubmit} />
        </form>
    );
};
