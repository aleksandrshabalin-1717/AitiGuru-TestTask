import React, { FunctionComponent, ReactElement } from 'react';
import { EIconType, IPropsIcon } from './interfaces';
import Add from './images/Add';
import Arrow from './images/Arrow';
import ArrowLeft from './images/ArrowLeft';
import ArrowRight from './images/ArrowRight';
import Close from './images/Close';
import Eye from './images/Eye';
import Lock from './images/Lock';
import Logo from './images/Logo';
import Menu from './images/Menu';
import Plus from './images/Plus';
import Search from './images/Search';
import Sort from './images/Sort';
import User from './images/User';
import './styles/index.scss';

const componentStyleName = 'icon-svg';

const Icon: FunctionComponent<IPropsIcon> = (props) => {
    let icon: ReactElement = null;
    
    switch (props.type) {
        case EIconType.Add:
            icon = <Add />;
            break;
        case EIconType.Arrow:
            icon = <Arrow />;
            break;
        case EIconType.ArrowLeft:
            icon = <ArrowLeft />;
            break;
        case EIconType.ArrowRight:
            icon = <ArrowRight />;
            break;
        case EIconType.Close:
            icon = <Close />;
            break;
        case EIconType.Eye:
            icon = <Eye />;
            break;
        case EIconType.Lock:
            icon = <Lock />;
            break;
        case EIconType.Logo:
            icon = <Logo />;
            break;
        case EIconType.Menu:
            icon = <Menu />;
            break;
        case EIconType.Plus:
            icon = <Plus />;
            break;
        case EIconType.Search:
            icon = <Search />;
            break;
        case EIconType.Sort:
            icon = <Sort />;
            break;
        case EIconType.User:
            icon = <User />;
            break;
        default:
            icon = null;
    };
    
    return (
        <div className={`${componentStyleName}-${props.type} icon`}>
            {icon}
        </div>
    );
};

export default Icon;
