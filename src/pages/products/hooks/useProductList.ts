import { useEffect, useState } from 'react';
import useProductListStore from '../../../store/productListStore';

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
        setSkip,
        setSort,
        setSortDirection,
        setSearch,
        resetData,
        fetchProductList,
    } = useProductListStore();

    useEffect(() => {
        fetchProductList();
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
        fetchProductList,
    });
}

export default useProductList;
