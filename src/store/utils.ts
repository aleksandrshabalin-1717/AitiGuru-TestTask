import { ESortType, ESortDirection, IResponseProductData, IProductData } from "./productListStore"

export const getFetchProductListParams = (
    search: string | null,
    limit: number,
    skip: number,
    select: string[],
    sort: ESortType | null,
    sortDirection: ESortDirection,
): string => {
    const searchResult = search !== null
        ? `/search?q=${search}&`
        : '?';
    const limitResult = `limit=${limit}`;
    const skipResult = `&skip=${skip}`;
    const selectResult = `&select=${select.join(',')}`;
    const sortResult = sort !== null
        ? `&sortBy=${sort}&order=${sortDirection}`
        : '';

    return `${searchResult}${limitResult}${skipResult}${selectResult}${sortResult}`;
}

export const convertResponseProductList = (productList: IResponseProductData[]): IProductData[] => {
    return productList.map(
        (item: any) => {
            return {
                id: item.id,
                title: item.title,
                price: item.price,
                category: item.category,
                // Картинок может не быть (есть товары без картинок)
                images: item.images??[0],
                // Бренд может не приходить
                brand: item.brand ?? '-',
                sku: item.sku,
                rating: item.rating,
                // ...item,
                // images: item.images[0]
            };
        }
    );
}
