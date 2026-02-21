export const debounceFn = (fn: Function, dalay: number) => {
    let thisArg;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    return function(...args: any[]) {
        thisArg = this;

        if (timerId) clearTimeout(timerId);

        timerId = setTimeout(
            fn.bind(thisArg),
            dalay,
            ...args
        )
    }
}
