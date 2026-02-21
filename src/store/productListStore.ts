import { create } from 'zustand';
import { getFetchProductListParams, convertResponseProductList } from './utils';

export interface IProductData {
    id: number;
    title: string;
    category: string;
    images: string;
    price: number;
    brand: string;
    sku: string;
    rating: number;
}

export interface IResponseProductData {
    id: number;
    title: string;
    category: string;
    images?: string[];
    price: number;
    brand?: string;
    sku: string;
    rating: number;
}

export enum ESortType {
    Price = 'price',
    Rating = 'rating',
}

export enum ESortDirection {
    Asc = 'asc',
    Desc = 'desc',  // По убыванию
}

interface State {
    data: IProductData[] | null;
    isLoad: boolean;
    error: string | null;
    // Количество найденных продуктов
    total: number;
    // Первый продукт на текущей странице
    skip: number;
    sort: ESortType | null;
    sortDirection: ESortDirection;
    search: string | null;
}

type Actions = {
    setSkip: (value: number) => void;
    setSort: (value: ESortType | null) => void;
    setSortDirection: (value: ESortDirection | null) => void;
    setSearch: (value: string | null) => void;
    resetData: () => void;
    fetchProductList: () => void;
};
  
const InitialState: State = {
    data: null,
    isLoad: false,
    error: null,
    total: 0,
    skip: 0,
    sort: null,
    sortDirection: ESortDirection.Asc,
    search: null,
};

const useProductListStore = create<State & Actions>()(
    (set, get) => ({
        ...InitialState,
        setSkip: (skip: number) => {
            set({skip});
        },
        setSort: (sort: ESortType | null) => {
            set({sort});
        },
        setSortDirection: (sortDirection: ESortDirection) => {
            set({sortDirection});
        },
        setSearch: (search: string | null) => {
            set({search});
        },
        resetData: () => {
            set({...InitialState});
        },
        fetchProductList: async () => {
            set({ isLoad: true, error: null })

            const params = getFetchProductListParams(
                get().search,
                10,
                get().skip,
                ['title', 'price', 'category', 'images',
                    'brand', 'sku', 'rating'],
                get().sort,
                get().sortDirection,
            );

            try {
                const response = await fetch(`https://dummyjson.com/products${params}`);
                if (response.status !== 200) {
                    throw new Error('Fetch error!');
                }

                const result = await response.json();
                const productsData = convertResponseProductList(result.products);

                set({
                    data: productsData,
                    total: result.total,
                    skip: result.skip,
                    isLoad: false,
                })
            } catch (error) {
                set({
                    data: null,
                    isLoad: false,
                    error: error.message,
                    total: 0,
                    skip: 0,
                })
            }
        },
    })
);

export default useProductListStore;
