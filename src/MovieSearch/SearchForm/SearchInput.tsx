import React, { useEffect, useLayoutEffect, useRef } from "react";
import classes from "./search-input.module.css";
import { useUnit } from "effector-react";
import { factory } from "../factory";

const Input: React.FC = () => {
    const ref = useRef<HTMLDivElement>(null);
    const model = factory.useModel();
    const value = useUnit(model.$input);

    useLayoutEffect(() => {
        ref.current?.focus();
    }, []);

    useEffect(() => {
        const subscription = model.clear.watch(() => ref.current?.focus());
        return () => subscription.unsubscribe();
    }, [model.clear]);

    return (
        <input
            type="text"
            name="search"
            placeholder="Search movie..."
            value={value}
            onChange={event => model.inputChanged(event.target.value)}
            onKeyDown={model.keyPressed}
        />
    );
};

const SearchButton: React.FC = () => {
    const model = factory.useModel();
    const canSearch = useUnit(model.$canSearch);

    return (
        <button
            type="button"
            disabled={!canSearch}
            onClick={() => model.searchPressed()}
        >
            Search
        </button>
    );
};

export const SearchInput: React.FC = () => {
    return (
        <div className={classes.container}>
            <Input />
            <SearchButton />
        </div>
    );
};
