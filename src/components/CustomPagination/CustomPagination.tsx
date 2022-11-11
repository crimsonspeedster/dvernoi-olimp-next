import styles from './CustomPagination.module.scss';
import React, { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import classNames from "classnames";

interface Pagination {
    pages: number,
    initialPage: number,
    handlePageClick: (selectedItem: {selected: number}) => void
}

const CustomPagination: React.FC<Pagination> = (props) => {
    const {
        pages,
        initialPage,
        handlePageClick
    } = props;

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            forcePage={initialPage}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            activeClassName={styles.active}
            containerClassName={classNames('pagination', styles.pagination)}
            breakClassName={styles.break}
            previousLabel="<"
            previousClassName={styles.prev}
            disabledClassName={styles.disabled}
            nextClassName={styles.next}
            pageCount={pages}
        />
    );
};

export default CustomPagination;

// export interface IOnPageChange {selected: number};