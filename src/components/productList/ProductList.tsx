import React, { FunctionComponent } from 'react';
import HeadList from './HeadList';
import ProductListItem from './ProductListItem';
import { IPropsProductList } from './interfaces';
import './styles/index.scss';

const componentStyleName = 'productList';

const ProductList: FunctionComponent<IPropsProductList> = (
    { productList, sortData, sortDirection, onSort, onSortDirection }
) => {
    return (
        <div className={componentStyleName}>
            <div className='list'>
                <HeadList
                    sortData={sortData}
                    sortDirection={sortDirection}
                    onSort={onSort}
                    onSortDirection={onSortDirection}
                />
                {productList && productList.map((item) => {
                    return (
                        <ProductListItem key={item.id} item={item} />
                    );
                })}
            </div>
        </div>
    );
};

export default ProductList;
