import React from "react";
import classes from "./search-form.module.css";
import { useUnit } from "effector-react";
import { Field } from "./Field";
import { factory } from "../factory";

const ClearButton: React.FC = () => {
    const model = factory.useModel();

    return (
        <button
            type="button"
            className={classes.clearButton}
            onClick={() => model.clearForm()}
        >
            Clear
        </button>
    );
};

const SubmitButton: React.FC = () => {
    const model = factory.useModel();
    const canSubmit = useUnit(model.$canSubmit);

    return (
        <button type="submit" disabled={!canSubmit}>
            Search
        </button>
    );
};

export const SearchForm: React.FC = () => {
    const model = factory.useModel();
    const state = useUnit(model.$form);
    const canClear = useUnit(model.$canClear);

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
                {canClear && <ClearButton />}
            </Field>
            <SubmitButton />
        </form>
    );
};
