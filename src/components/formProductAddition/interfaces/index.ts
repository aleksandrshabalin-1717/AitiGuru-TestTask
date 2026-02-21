import { INewProduct } from '../../../store/addProductStore';
import { EModalModeType } from '../../modal';

interface IPropsFormProductAddition {
    onAddProduct: (product: INewProduct) => void;
    onClose: (value: EModalModeType) => void;
    onNotify: () => void;
};

export {
    IPropsFormProductAddition,
    INewProduct,
};
