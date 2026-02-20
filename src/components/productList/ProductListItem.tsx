import React, { FunctionComponent } from 'react';
import Icon, { EIconType } from '../icon';
import { IPropsProductListItem } from './interfaces';
import { getRatingPrice, getFormatedPrice } from './utils';

const ProductListItem: FunctionComponent<IPropsProductListItem> = ({ item }) => {
    return (
        <div className='item'>
            <div className='checkBox-wrap'>
                <input
                    className='checkbox'
                    name='checkbox'
                    type='checkbox'
                />
            </div>
            <div className='image'>
                <img src={item.images} />
            </div> 
            <div className='name'>
                <div>
                    {item.title}
                </div>
                <div>
                    {item.category}
                </div>
            </div>
            <div className='vendor'>
                {item.brand ?? '-'}
            </div>
            <div className='artic'>
                {item.sku}
            </div>
            {getRatingPrice(item.rating)}
            {getFormatedPrice(item.price)}
            <div className='control'>
                <div className='add'>
                    <Icon type={EIconType.Add} />
                </div>
                <div className='menu'>
                    <Icon type={EIconType.Menu} />
                </div>
            </div>
        </div>
    );
};

export default ProductListItem;
