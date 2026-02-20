import { EModalModeType } from './enums';

interface IPropsModal {
    mode: EModalModeType;
    toggleModal: (mode: EModalModeType) => void;
    children?: React.ReactNode,
};

export {
    EModalModeType,
    IPropsModal,
};
