import { useEffect, useState } from 'react';
import useProductListStore from '../../../store/productListStore';

const errorFetchProduct = 'Error fetch product list data, please try again in later';

const useProductList = () => {
    const {
        data: productList,
        total: totalProductList,
        skip: skipProductList,
        isLoad: isProductListLoad,
        error: fetchProductListError,
        sort: sortProductList,
        sortDirection: sortDirectionProductList,
        search: searchProductList,
        setData,
        setTotal,
        setSkip,
        setIsLoad,
        setError,
        setSort,
        setSortDirection,
        setSearch,
        resetData,
    } = useProductListStore();

    useEffect(() => {
        const search = searchProductList !== null
            ? `/search?q=${searchProductList}&`
            : '?';
        const limit = 'limit=10';
        const skip = `&skip=${skipProductList}`;
        const select = `&select=title,price,category,images,brand,sku,rating`;
        const sort = sortProductList !== null
            ? `&sortBy=${sortProductList}&order=${sortDirectionProductList}`
            : '';

        setIsLoad(true);

        fetch(`https://dummyjson.com/products${search}${limit}${skip}${select}${sort}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(errorFetchProduct);
                }

                return response.json()
            }).then(
                (result) => {
                    const productsData = result.products.map(
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

                    setData(productsData);
                    setTotal(result.total);
                    setSkip(result.skip);
                },
                (error) => {
                    resetData();
                    setError(error.message);
                },
            ).finally(() => {
                setIsLoad(false);
            });
    }, [skipProductList, sortProductList, sortDirectionProductList, searchProductList]);

    return ({
        productList,
        totalProductList,
        skipProductList,
        isProductListLoad,
        fetchProductListError,
        sortProductList,
        sortDirectionProductList,
        searchProductList,
        setSkip,
        setSort,
        setSortDirection,
        setSearch,
        resetData,
    });
}

export default useProductList;
