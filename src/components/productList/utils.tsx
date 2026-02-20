export const getFormatedPrice = (price: number): React.ReactElement => {
    let priceFractional: number = Math.trunc(
        Math.round((price - Math.trunc(price)) * 100)
    );

    return (
        <div className='price'>
            {`${price.toLocaleString('ru-RU', { maximumFractionDigits: 0 })}`}
            <span>{`, ${priceFractional}`}</span>
        </div>
    );
}

export const getRatingPrice = (rating: number): React.ReactElement => {
    return (
        <div className='rating'>
            <span className={(rating < 3) ? 'red' : ''} >
                {rating}
            </span>
            {`/5`}
        </div>
    );
}
