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

export const getFormatedTitle = (total: number, search: string) => {
    let strArr: string[] = `${total}`.split('');
    let word = 'позиций';

    if (total < 5 && total > 20) {
        switch (strArr[strArr.length - 1]) {
            case '1':
                word = 'позиция';
                break;
            case '2':
            case '3':
            case '4':
                word = 'позиции';
                break;
            default:
                word = 'позиций';
        }
    }

    return `Найдено ${total} ${word}, по запросу: "${search}"`;
}
