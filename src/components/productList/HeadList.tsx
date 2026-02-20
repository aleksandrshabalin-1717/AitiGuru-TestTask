import React, { FunctionComponent } from 'react';
import Icon, { EIconType } from '../icon';
import { IPropsHeadList, ESortType, ESortDirection } from './interfaces';

const HeadList: FunctionComponent<IPropsHeadList> = (
    { sortData, sortDirection, onSort, onSortDirection }
) => {
    const onSorted = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let target = event.currentTarget;
        let sortType = target.getAttribute('data-sort') as ESortType;

        if (sortData === sortType) {
            onSort(null);
            onSortDirection(ESortDirection.Asc);
        } else {
            onSort(sortType);
            onSortDirection(ESortDirection.Asc);
        }
    }

    const setSortDirection = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let target = event.currentTarget;
        let sortType = target.getAttribute('data-sort') as ESortType;

        if (sortData !== sortType) return;

        switch (sortDirection) {
            case ESortDirection.Asc:
                onSortDirection(ESortDirection.Desc);
                break;
            case ESortDirection.Desc:
                onSortDirection(ESortDirection.Asc);
                break;
        }
    }

    return (
        <div className='item head'>
            <div className='checkBox-wrap'>
                <input
                    className='checkbox'
                    name='checkbox'
                    type='checkbox'
                />
            </div>
            <div className='name'>
                {'Наименование'}
            </div>
            <div className='vendor'>
                {'Вендор'}
            </div>
            <div className='artic'>
                {'Артикул'}
            </div>
            <div
                className={`rating has-sort ${sortData === ESortType.Rating ? 'current' : ''}`}
            >
                <div
                    className={`sort-wrap ${sortDirection}`}
                    data-sort={ESortType.Rating}
                    onClick={setSortDirection}
                >
                    <Icon type={EIconType.Sort} />
                </div>
                <div
                    data-sort={ESortType.Rating}
                    onClick={onSorted}
                >
                    {'Оценка'}
                </div>
            </div>
            <div
                className={`price has-sort ${sortData === ESortType.Price ? 'current' : ''}`}
            >
                <div
                    className={`sort-wrap ${sortDirection}`}
                    data-sort={ESortType.Price}
                    onClick={setSortDirection}
                >
                    <Icon type={EIconType.Sort} />
                </div>
                <div
                    data-sort={ESortType.Price}
                    onClick={onSorted}
                >
                    {'Цена, ₽'}
                </div>
            </div>
            <div className='control' />
        </div>
    );
};

export default HeadList;
