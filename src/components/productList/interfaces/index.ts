import { IProductData, ESortType, ESortDirection } from '../../../store/productListStore';

interface IPropsProductList {
    productList: IProductData[];
    sortData: ESortType | null;
    sortDirection: ESortDirection;
    onSort: (sortData: ESortType | null) => void;
    onSortDirection: (sortDirection: ESortDirection) => void;
    resetData: () => void;
};

interface IPropsProductListItem {
    item: IProductData;
};

type IPropsHeadList = Omit<IPropsProductList, 'productList' | 'resetData'>

export {
    IPropsProductList,
    IPropsProductListItem,
    IPropsHeadList,
    ESortType,
    ESortDirection,
};
