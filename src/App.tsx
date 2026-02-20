import React, { StrictMode } from 'react';
import { Main } from './pages/Main';
import './styles/App.scss';

const App = () => {
    let hasSavedToken = false;

    // Сhecking the auth status
    if (
        localStorage.getItem('token') !== null ||
        sessionStorage.getItem('token') !== null
    ) {
        hasSavedToken = true;
    }

    return (
        <StrictMode>
            <Main isUserAuthorized={hasSavedToken} />
        </StrictMode>
    );
}

export default App;
