import React, {
    ReactNode,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef
} from "react";
import cn from "classnames";
import classes from "./field.module.css";
import { clearForm } from "../events";

type Props = {
    readonly name?: string;
    readonly type?: string;
    readonly value: string;
    readonly onChange: (value: string) => void;
    readonly placeHolder: string;
    readonly className?: string;
    readonly autoFocus?: boolean;
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
    autoFocus = false
}) => {
    const ref = useRef<HTMLInputElement>(null);

    const focus = useCallback(() => {
        if (autoFocus && ref.current !== null) {
            ref.current.focus();
        }
    }, [autoFocus]);

    useLayoutEffect(() => focus(), [focus]);

    useEffect(() => {
        const subscription = clearForm.watch(() => focus());
        return () => subscription.unsubscribe();
    }, [focus]);

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
