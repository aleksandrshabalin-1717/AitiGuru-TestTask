export const getCurrentPage = (skip: number): number => {
    return (skip / 10) + 1;
}

export const getCountPage = (total: number): number => {
    return Math.ceil(total / 10);
}

export const getPrevPage = (total: number, skip: number): number | null => {
    let currentPage: number = getCurrentPage(skip);
    return currentPage === 1 ? null : currentPage - 1;
}

export const getNextPage = (total: number, skip: number): number | null => {
    let currentPage: number = getCurrentPage(skip);
    let countPage: number = getCountPage(total)

    return currentPage === countPage ? null : currentPage + 1;
}

export const getSkip = (page: number | null): number => {
    if (page === null) return 0;

    return (page - 1) * 10;
}
