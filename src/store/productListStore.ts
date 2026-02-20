import { create } from 'zustand';

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
    setData: (value: IProductData[] | null) => void;
    setIsLoad: (value: boolean) => void;
    setError: (value: string | null) => void;
    setTotal: (value: number) => void;
    setSkip: (value: number) => void;
    setSort: (value: ESortType | null) => void;
    setSortDirection: (value: ESortDirection | null) => void;
    setSearch: (value: string | null) => void;
    resetData: () => void;
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
    (set) => ({
        ...InitialState,
        setData: (data: IProductData[] | null) => {
            set({data});
        },
        setIsLoad: (isLoad: boolean) => {
            set({isLoad});
        },
        setError: (error: string | null) => {
            set({error});
        },
        setTotal: (total: number) => {
            set({total});
        },
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
    })
);

export default useProductListStore;
