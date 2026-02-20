import React, { FunctionComponent, useState } from 'react';
import Icon, { EIconType } from '../icon';
import { EModalModeType } from '../modal';
import { IPropsFormProductAddition } from './interfaces';
import './styles/index.scss';

const componentStyleName = 'form-add';

const FormProductAddition: FunctionComponent<IPropsFormProductAddition> = ({ onAddProduct, onClose }) => {
    const [title, setTitle] = useState<string | null>(null);
    const [titleError, setTitleError] = useState<boolean>(false);
    const [category, setCategory] = useState<string | null>(null);
    const [categoryError, setCategoryError] = useState<boolean>(false);
    const [price, setPrice] = useState<number | null>(null);
    const [priceError, setPriceError] = useState<boolean>(false);
    const [brand, setBrand] = useState<string | null>(null);
    const [brandError, setBrandError] = useState<boolean>(false);
    const [sku, setSku] = useState<string | null>(null);
    const [skuError, setSkuError] = useState<boolean>(false);

    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    const onSetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    let onBlurTitle = () => {
        if (!title) {
            setTitleError(true);
        } else {
            setTitleError(false);
        }
    }

    const onSetCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(event.target.value);
    }

    let onBlurCategory = () => {
        if (!category) {
            setCategoryError(true);
        } else {
            setCategoryError(false);
        }
    }

    const onSetCPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
        let str = event.target.value;

        if (str === '') {
            setPrice(null);
        } else {
            let price = parseFloat(event.target.value);

            if (isFinite(price)) {
                setPrice(price);
            }
        }
    }

    let onBlurPrice = () => {
        if (!price) {
            setPriceError(true);
        } else {
            setPriceError(false);
        }
    }

    const onSetBrand = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBrand(event.target.value);
    }

    let onBlurBrand = () => {
        if (!brand) {
            setBrandError(true);
        } else {
            setBrandError(false);
        }
    }

    const onSetSku = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSku(event.target.value);
    }

    let onBlurSku = () => {
        if (!sku) {
            setSkuError(true);
        } else {
            setSkuError(false);
        }
    }

    const onSubmint = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (titleError || categoryError || priceError || brandError || skuError) {
            return;
        }

        onAddProduct({
            title,
            category,
            price,
            brand,
            sku,
        });

        setIsSuccess(true);
    }

    const onCloseForm = () => {
        onClose(EModalModeType.Close);
        setTitle(null);
        setTitleError(false);
        setCategory(null);
        setCategoryError(false);
        setPrice(null);
        setPriceError(false);
        setBrand(null);
        setBrandError(false);
        setSku(null);
        setSkuError(false);
        setIsSuccess(false);
    }

    if (isSuccess) {
        return (
            <div className={`${componentStyleName}`}>
                <div
                    className='button-close'
                    onClick={onCloseForm}
                >
                    <Icon type={EIconType.Close} />
                </div>
                <div className='success-message'>
                    Новый продукт успешно добавлен!
                </div>
            </div>
        );
    }

    return (
        <div className={`${componentStyleName}`}>
            <div
                className='button-close'
                onClick={onCloseForm}
            >
                <Icon type={EIconType.Close} />
            </div>
            <div className='title'>Добавить продукт</div>
            <form onSubmit={onSubmint}>
                <label htmlFor='title'>Наименование</label>
                <input
                    className='title-input'
                    name='title'
                    type='text'
                    value={title ?? ''}
                    placeholder='Введите наименование...'
                    onChange={onSetTitle}
                    onBlur={onBlurTitle}
                />
                {titleError && (
                    <div className='error-input'>
                        Title not valid!
                    </div>
                )}
                <div className='double'>
                    <div>
                        <label htmlFor='category'>Категория</label>
                        <input
                            className='category-input'
                            name='category'
                            type='text'
                            value={category ?? ''}
                            placeholder='Введите категорию...'
                            onChange={onSetCategory}
                            onBlur={onBlurCategory}
                        />
                        {categoryError && (
                            <div className='error-input'>
                                Category not valid!
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor='price'>Цена</label>
                        <input
                            className='price-input'
                            name='price'
                            type='text'
                            value={price ?? ''}
                            placeholder='Введите цену...'
                            onChange={onSetCPrice}
                            onBlur={onBlurPrice}
                        />
                        {priceError && (
                            <div className='error-input'>
                                Price not valid!
                            </div>
                        )}
                    </div>
                </div>
                <div className='double'>
                    <div>
                        <label htmlFor='brand'>Вендор</label>
                        <input
                            className='brand-input'
                            name='brand'
                            type='text'
                            value={brand ?? ''}
                            placeholder='Введите вендора...'
                            onChange={onSetBrand}
                            onBlur={onBlurBrand}
                        />
                        {brandError && (
                            <div className='error-input'>
                                Brand not valid!
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor='sku'>Артикул</label>
                        <input
                            className='sku-input'
                            name='sku'
                            type='text'
                            value={sku ?? ''}
                            placeholder='Введите артикул...'
                            onChange={onSetSku}
                            onBlur={onBlurSku}
                        />
                        {skuError && (
                            <div className='error-input'>
                                Sku not valid!
                            </div>
                        )}
                    </div>
                </div>
                <button type='submit'>Добавить</button>
            </form>
        </div>
    );
};

export default FormProductAddition;
