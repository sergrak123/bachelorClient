import React from 'react';
import {getPagesArray} from "../../../utils/pages";

//для отображения текущей
// const Pagination = ({totalPages, , page, changePage}) => {
const Pagination = ({totalPages, changePage}) => {
    let pagesArray = getPagesArray(totalPages)

    return (
        <div style={{marginTop: 30}}>
            {pagesArray.map(p =>
                <button
                    key={p}
                    onClick={() => changePage(p)}
                >{p}
                </button>
            )}
        </div>
    );
};

export default Pagination;