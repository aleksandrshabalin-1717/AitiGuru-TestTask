import React, { FunctionComponent, memo } from 'react';
import './styles/index.scss';

const componentStyleName = 'app-loader';

const Loader: FunctionComponent = memo(() => {
    return (
        <div className={`${componentStyleName}`}>
            <div className='loader'/>
        </div>
    );
});

export default Loader;
