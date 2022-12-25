export function absurd(value: never): never {
    throw new Error("absurd", value);
}
