import { FunctionComponent } from 'react';
import { IPropsModal, EModalModeType } from './interfaces';
import './styles/index.scss';

const componentStyleName = 'modal';

const Modal: FunctionComponent<IPropsModal> = (props) => {
    const onClickBody = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event.stopPropagation();
    const onCloseModal = () => {
        props.toggleModal(EModalModeType.Close);
    }

    return (
        <div
            className={`${componentStyleName} ${props.mode === 'open' ? 'active' : ''}`}
            onClick={onCloseModal}
        >
            <div
                className='modal-body'
                onClick={onClickBody}
            >
                {props.children}
            </div>
        </div>
    );
};

export default Modal;
