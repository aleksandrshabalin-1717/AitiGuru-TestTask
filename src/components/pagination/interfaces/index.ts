interface IPropsPagination {
    total: number;
    skip: number;
    setPage: (value: number) => void;
};

export {
    IPropsPagination,
};
