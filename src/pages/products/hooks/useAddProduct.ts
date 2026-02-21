import { useEffect } from 'react';
import useAddProductStore from '../../../store/addProductStore';

const useAddProduct = () => {
    const {
        newProductList,
        setNewProduct
    } = useAddProductStore();

    // useEffect(() => {
    //      Логика отправки данных нового продукта на сервер
    // }, []);

    return ({
        newProductList,
        setNewProduct,
    });
}

export default useAddProduct;
