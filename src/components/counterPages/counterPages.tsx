import React, { FunctionComponent, memo } from 'react';
import { IPropsCounterProducts } from './interfaces';
import * as utils from './utils';
import './styles/index.scss';

const componentStyleName = 'counter';

const CounterProducts: FunctionComponent<IPropsCounterProducts> = memo(({ total, skip }) => {
    const range = `${utils.getFirstProduct(skip)}-${utils.getLastProduct(total, skip)}`;

    if (total === 0) return null;

    return (
        <div className={componentStyleName}>
            {`Показано `}<span>{range}</span>{` из `}<span>{total}</span>
        </div>
    );
});

export default CounterProducts;
