import React, { useState } from 'react';
import Icon, { EIconType } from '../../components/icon';
import CounterPages from '../../components/counterPages';
import Loader from '../../components/loader';
import Modal, { EModalModeType } from '../../components/modal';
import Pagination from '../../components/pagination';
import ProductList from '../../components/productList';
import FormProductAddition from '../../components/formProductAddition';
import useProductList from './hooks/useProductList';
import useAddProduct from './hooks/useAddProduct';
import { debounceFn, getFormatedTitle } from './utils';
import './styles/index.scss';

const componentStyleName = 'products';

const Products: React.FC = () => {
    let [isModalOpen, setIsModalOpen] = useState<EModalModeType>(EModalModeType.Close);

    let {
        productList,
        totalProductList,
        skipProductList,
        isProductListLoad,
        // fetchProductListError,
        sortProductList,
        sortDirectionProductList,
        searchProductList,
        setSkip,
        setSort,
        setSortDirection,
        setSearch,
        resetData,
    } = useProductList();
    let { setNewProduct } = useAddProduct();

    const setSearchString = debounceFn(function(event: React.ChangeEvent<HTMLInputElement>) {
        const searchString: string | null = event.target.value === ''
            ? null
            : event.target.value;

        resetData();
        setSearch(searchString);
    }, 1000);

    return (
        <div className={componentStyleName}>
            <div className='head'>
                <div className='title'>
                    Товары
                </div>
                <div className='search'>
                    <div className='icon'>
                        <Icon type={EIconType.Search} />
                    </div>
                    <input
                        name='search'
                        type='text'
                        placeholder='Найти'
                        onChange={setSearchString}
                    />
                </div>
            </div>
            <div className='body'>
                <div className='title'>
                    <div>
                        {searchProductList
                            ? getFormatedTitle(totalProductList, searchProductList)
                            : 'Все позиции'
                        }
                    </div>
                    <div className='control'>
                        <div
                            className='reset-search'
                            onClick={resetData}
                        >
                            <Icon type={EIconType.Arrow} />
                        </div>
                        <div
                            className='add'
                            onClick={() => setIsModalOpen(EModalModeType.Open)}
                        >
                            <Icon type={EIconType.Plus} />
                            <span>Добавить</span>
                        </div>
                    </div>
                </div>
                {isProductListLoad
                    ? (
                        <div className='loader-wrap'>
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <div className='productList-wrap'>
                                <ProductList
                                    productList={productList}
                                    sortData={sortProductList}
                                    sortDirection={sortDirectionProductList}
                                    onSort={setSort}
                                    onSortDirection={setSortDirection}
                                />
                            </div>
                            <div className='pagination-wrap'>
                                <CounterPages
                                    total={totalProductList}
                                    skip={skipProductList}
                                />
                                <Pagination
                                    total={totalProductList}
                                    skip={skipProductList}
                                    setPage={setSkip}
                                />
                            </div>
                        </>
                    )}
            </div>
            <Modal
                mode={isModalOpen}
                toggleModal={() => null}
            >
                <FormProductAddition
                    onAddProduct={setNewProduct}
                    onClose={setIsModalOpen}
                />
            </Modal>
        </div>
    );
}

export default Products;
