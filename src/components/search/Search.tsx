import React, { FunctionComponent, memo, useEffect, useRef } from 'react';
import Icon, { EIconType } from '../icon';
import { IPropsSearch } from './interfaces';
import { debounceFn } from './utils';
import './styles/index.scss';

const componentStyleName = 'search';

const Search: FunctionComponent<IPropsSearch> = memo(({ searchString, setSearchString }) => {
    const searchInput = useRef(null);

    useEffect(() => {
        searchInput.current.value = searchString?? ''
    }, [searchString]);

    const onChange = debounceFn((event: React.ChangeEvent<HTMLInputElement>) => {
        const searchString: string | null = event.target.value !== ''
            ? event.target.value
            : null;

        setSearchString(searchString);
    }, 1000);

    return (
        <div className={componentStyleName}>
            <div className='title'>
                Товары
            </div>
            <div className='search-wrap'>
                <div className='icon'>
                    <Icon type={EIconType.Search} />
                </div>
                <input
                    name='search'
                    type='text'
                    ref={searchInput}
                    placeholder='Найти'
                    onChange={onChange}
                />
            </div>
        </div>
    );
});

export default Search;
