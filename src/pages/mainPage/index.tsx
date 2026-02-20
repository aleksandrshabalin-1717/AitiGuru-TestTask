import React, { useState } from 'react';
import Authorization from '../authorization';
import Products from '../products';
import { IPropsMainPage } from './interfaces';
import './styles/index.scss';

const MainPage: React.FunctionComponent<IPropsMainPage> = ({ isUserAuthorized }) => {
    let [isLogin, setIsLogin] = useState<boolean>(isUserAuthorized);

    let setStatus = (status: boolean) => {
        setIsLogin(status);
    }

    return (
        <div className='main'>
            {isLogin
                ? <Products />
                : <Authorization setStatus={setStatus} />}
        </div>
    ); 
}

export default MainPage;
