import React, { FunctionComponent, memo } from 'react';
import Icon, { EIconType } from '../icon';
import { IPropsPagination } from './interfaces';
import * as utils from './utils';
import './styles/index.scss';

const componentStyleName = 'pagination';

const Pagination: FunctionComponent<IPropsPagination> = memo(({ total, skip, setPage }) => {
    const currentPage = utils.getCurrentPage(skip);
    const prevPage = utils.getPrevPage(total, skip);
    const nexttPage = utils.getNextPage(total, skip);
    const countPage = utils.getCountPage(total);

    const setPrevPage = () => {
        if (prevPage !== null) {
            let skip = utils.getSkip(prevPage);

            setPage(skip);
        }
    }

    const setNextPage = () => {
        if (nexttPage !== null) {
            let skip = utils.getSkip(nexttPage);

            setPage(skip);
        }
    }

    const setCurrentPage = (page: number) => {
        if (page !== currentPage) {
            let skip = utils.getSkip(page);
    
            setPage(skip);
        }
    }

    if (countPage <= 1) return null;

    return (
        <div className={componentStyleName}>
            <div
                className='prev'
                onClick={setPrevPage}
            >
                <Icon type={EIconType.ArrowLeft} />
            </div>
            <div className='pages'>
                {new Array(countPage).fill(null).map((_item, index, _arr) => {
                    return (
                        <div
                            key={`${index}`}
                            className={`item ${
                                (index + 1) === currentPage
                                    ? 'current'
                                    : ''
                            }`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {`${index + 1}`}
                        </div>
                    )
                })}
            </div>
            <div
                className='next'
                onClick={setNextPage}
            >
                <Icon type={EIconType.ArrowRight} />
            </div>
        </div>
    );
});

export default Pagination;
