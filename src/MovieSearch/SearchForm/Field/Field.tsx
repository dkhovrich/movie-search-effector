import React, { ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import cn from "classnames";
import { Event } from "effector";
import classes from "./field.module.css";

type Props = {
    readonly name?: string;
    readonly type?: string;
    readonly value: string;
    readonly onChange: (value: string) => void;
    readonly placeHolder: string;
    readonly className?: string;
    readonly focusOnMount?: boolean;
    readonly focusOnEvent?: Event<void>;
    readonly children?: ReactNode;
};

export const Field: React.FC<Props> = ({
    name,
    type = "text",
    value,
    onChange,
    placeHolder,
    className,
    children,
    focusOnMount = false,
    focusOnEvent
}) => {
    const ref = useRef<HTMLInputElement>(null);

    useLayoutEffect(() => {
        if (focusOnMount && ref.current !== null) {
            ref.current.focus();
        }
    }, [focusOnMount]);

    useEffect(() => {
        if (focusOnEvent === undefined) return;
        const subscription = focusOnEvent.watch(() => {
            ref.current?.focus();
        });
        return () => subscription.unsubscribe();
    }, [focusOnEvent]);

    return (
        <div className={cn(className, classes.field)}>
            <input
                ref={ref}
                name={name}
                type={type}
                placeholder={placeHolder}
                value={value}
                onChange={event => onChange(event.target.value)}
            />
            {children && <div className={classes.children}>{children}</div>}
        </div>
    );
};
