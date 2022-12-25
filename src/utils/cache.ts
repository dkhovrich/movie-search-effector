type Search<T> = (input: string) => Promise<T>;

export function cacheDecorator<T>(search: Search<T>): Search<T> {
    const cache = new Map<string, T>();
    return async input => {
        const cachedValue = cache.get(input);
        if (cachedValue != null) {
            return cachedValue;
        }
        const value = await search(input);
        cache.set(input, value);
        return value;
    };
}
