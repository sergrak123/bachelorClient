import React from 'react';
import Category from "../components/Category";
import ProductList from "../components/ProductList";
import Pagination from "../components/Pagination";

function Catalog(props) {
    return (
        <div className="w-full">
            <div className="flex bg-gray-100">

                <div className="w-1/6 mt-36 bg-white rounded-md ml-10" >
                    <Category/>
                </div>
                <div className="w-4/6 pl-16 mb-28">
                    <ProductList/>
                    <Pagination/>
                </div>
            </div>
        </div>
    );
}

export default Catalog;