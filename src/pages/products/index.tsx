import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Icon, { EIconType } from '../../components/icon';
import CounterPages from '../../components/counterPages';
import Loader from '../../components/loader';
import Modal, { EModalModeType } from '../../components/modal';
import Pagination from '../../components/pagination';
import ProductList from '../../components/productList';
import Search from '../../components/search';
import FormProductAddition from '../../components/formProductAddition';
import useProductList from './hooks/useProductList';
import useAddProduct from './hooks/useAddProduct';
import { getFormatedTitle } from './utils';
import './styles/index.scss';

const componentStyleName = 'products';

const Products: React.FC = () => {
    let [isModalOpen, setIsModalOpen] = useState<EModalModeType>(EModalModeType.Close);
    let {
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
    } = useProductList();
    let { newProductList, setNewProduct } = useAddProduct();

    // console.log(newProductList);

    const setNotify = () => toast('Товар успешно добавлен!');

    if (fetchProductListError !== null) {
        return (
            <div className={componentStyleName}>
                <Search
                    searchString={searchProductList}
                    setSearchString={setSearch}
                />
                <div className='body'>
                    <div className='error-productlist'>
                        <div>
                            Ошибка запроса, повторите запрос либо зайдите позже!
                        </div>
                        <button onClick={fetchProductList}>
                            Повторить запрос
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={componentStyleName}>
            <Search
                searchString={searchProductList}
                setSearchString={setSearch}
            />
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
                        productList && <>
                            <div className='productList-wrap'>
                                <ProductList
                                    productList={productList}
                                    sortData={sortProductList}
                                    sortDirection={sortDirectionProductList}
                                    onSort={setSort}
                                    onSortDirection={setSortDirection}
                                    resetData={resetData}
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
                    onNotify={setNotify}
                />
            </Modal>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default Products;
