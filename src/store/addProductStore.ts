import { create } from 'zustand';

export interface INewProduct {
    title: string;
    category: string;
    price: number;
    brand: string;
    sku: string;
}

interface State {
    newProductList: INewProduct[] | null;
}

type Actions = {
    setNewProduct: (value: INewProduct) => void;
};
  
const InitialState: State = {
    newProductList: null,
};

const useAddProductStore = create<State & Actions>()(
    (set, get) => ({
        ...InitialState,
        setNewProduct: (newProduct: INewProduct) => {
            const prevProductList = get().newProductList;

            const productList = prevProductList === null
                ? [newProduct]
                : [...prevProductList, newProduct]

            set({newProductList: productList});
        },
    })
);

export default useAddProductStore;
