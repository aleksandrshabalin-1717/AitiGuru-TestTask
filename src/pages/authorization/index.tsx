import React, { useState, useRef } from 'react';
import Icon, { EIconType } from '../../components/icon';
import Loader from '../../components/loader';
import { IAuthorizationProps } from './interfaces';
import './styles/index.scss';

const componentStyleName = 'authorization';

const Authorization: React.FC<IAuthorizationProps> = ({ setStatus }) => {
    let [loginName, setLoginName] = useState<string>('');
    let [isValidLoginName, setIsValidLoginName] = useState<boolean>(true);

    let [isValidPassword, setIsValidPassword] = useState<boolean>(true);
    let [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);
    const passInput = useRef(null);

    let [isSavedLogin, setIsSavedLogin] = useState<boolean>(false);

    let [isLoad, setIsLoad] = useState<boolean>(false);
    let [fetchError, setFetchError] = useState<string>('');

    let onChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLoginName(event.target.value);
    }

    let onBlurLoginInput = () => {
        if (loginName === '') {
            setIsValidLoginName(false);
        } else {
            setIsValidLoginName(true);
        }
    }

    let onClearLogin = () => {
        setLoginName('');
    }

    const onTogglePassword = () => {
        setIsPasswordHidden(prevVisibleState => !prevVisibleState);
    }

    let onBlurPasswordInput = () => {
        if (passInput.current.value === '') {
            setIsValidPassword(false);
        } else {
            setIsValidPassword(true);
        }
    }

    let onChangeSavedLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSavedLogin(event.target.checked);
    }

    let onResetForm = () => {
        setLoginName('');
        setIsValidLoginName(true);
        setIsValidPassword(true);
        setIsSavedLogin(false);
    }

    let onSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Валидация логина и пароля при отправке формы
        if (loginName === '' || passInput.current.value === '') {
            setIsValidLoginName(loginName !== '');
            setIsValidPassword(passInput.current.value !== '');

            return;
        }

        setIsLoad(true);

        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: loginName,
                password: passInput.current.value,
            }),

            credentials: 'omit',
        }).then(async (response) => {
            if (!response.ok) {
                const errorData = await response.json();

                throw new Error(errorData.message
                    ? `Status: ${response.status}. ${errorData.message}!`
                    : `Status: ${response.status}. Unknow Error!`);
            }

            return response.json();
        }).then(
            (result) => {
                if (isSavedLogin) {
                    localStorage.setItem('token', result.accessToken);
                    localStorage.setItem('refreshToken', result.accessToken);
                } else {
                    sessionStorage.setItem('token', result.accessToken);
                    sessionStorage.setItem('refreshToken', result.accessToken);
                }

                // TODO При необходимости обработать (сохранить) данные пользователя:
                    // firstName, lastName, username, email и др.

                setFetchError('');
                setStatus(true);
            },
            (error) => {
                setFetchError(error.message);
                onResetForm();
                setIsLoad(false);
            }
        );
    }

    if (isLoad) {
        return (
            <div className={componentStyleName}>
                <Loader />
            </div>
        );
    }

    return (
        <div className={componentStyleName}>
            <div className='form-wrap'>
                <div className='form'>
                    <div className='logo'>
                        <Icon type={EIconType.Logo} />
                    </div>
                    <div className='title'>
                        <div>
                            Добро пожаловать!
                        </div>
                        <div>
                            Пожалуйста, авторизируйтесь
                        </div>
                    </div>
                    <form onSubmit={onSubmit}>
                        <label htmlFor='login'>Логин</label>
                        <div className='login-wrap'>
                            <div className='prev-icon-wrap'>
                                <Icon type={EIconType.User} />
                            </div>
                            <input
                                className='login-input'
                                name='login'
                                type='text'
                                value={loginName}
                                placeholder='Login'
                                onChange={onChangeLogin}
                                onBlur={onBlurLoginInput}
                            />
                            <div
                                className='icon-wrap'
                                onClick={onClearLogin}
                            >
                                <Icon type={EIconType.Close} />
                            </div>
                        </div>
                        {!isValidLoginName && (
                            <div className='error-input'>
                                Login name not valid!
                            </div>
                        )}
                        <label htmlFor='pass'>Пароль</label>
                        <div className='pass-wrap'>
                            <div className='prev-icon-wrap'>
                                <Icon type={EIconType.Lock} />
                            </div>
                            <input
                                autoComplete='off'
                                name='pass'
                                type={isPasswordHidden ? 'password' : 'text'}
                                ref={passInput}
                                placeholder='Password'
                                onBlur={onBlurPasswordInput}
                            />
                            <div
                                className='icon-wrap'
                                onClick={onTogglePassword}
                            >
                                <Icon type={EIconType.Eye} />
                            </div>
                        </div>
                        {!isValidPassword && (
                            <div className='error-input'>
                                Password not valid!
                            </div>
                        )}
                        <div className='checkbox'>
                            <input
                                className='login-save'
                                name='save-checkbox'
                                type='checkbox'
                                checked={isSavedLogin}
                                onChange={onChangeSavedLogin}
                            />
                            <label htmlFor='save-checkbox'>Запомнить данные</label>
                        </div>
                        {fetchError && (
                            <div className='error-fetch'>
                                {fetchError}
                            </div>
                        )}
                        <button type='submit'>Войти</button>
                        <div className='divider'>
                            <div/><div>или</div><div/>
                        </div>
                        <div className='create-account-link'>
                            Нет аккаунта? <span>Создать</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Authorization;
