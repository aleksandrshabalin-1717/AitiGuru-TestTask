import React, { FunctionComponent, memo } from 'react';
import HeadList from './HeadList';
import ProductListItem from './ProductListItem';
import { IPropsProductList } from './interfaces';
import './styles/index.scss';

const componentStyleName = 'productList';

const ProductList: FunctionComponent<IPropsProductList> = memo((
    { productList, sortData, sortDirection, onSort, onSortDirection, resetData }
) => {
    return (
        <div className={componentStyleName}>
            {productList.length === 0
                ? (
                    <div className='empty-list'>
                        <div>
                            Данные по вашему запросу отсутствуют, попробуйте
                            изменить параметры поиска либо очистить поиск!
                        </div>
                        <button onClick={resetData}>
                            Очистить поиск и перезагрузить данные
                        </button>
                    </div>
                ) : (
                    <div className='list'>
                        <HeadList
                            sortData={sortData}
                            sortDirection={sortDirection}
                            onSort={onSort}
                            onSortDirection={onSortDirection}
                        />
                        {productList.map((item) => {
                            return (
                                <ProductListItem key={item.id} item={item} />
                            );
                        })}
                    </div>
                )}
        </div>
    );
});

export default ProductList;
