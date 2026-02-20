export const getFirstProduct = (skip: number): number => {
    return skip + 1;
}

export const getLastProduct = (total: number, skip: number): number => {
    let lastProduct = skip + 10;

    return lastProduct > total ? total : lastProduct;
}
