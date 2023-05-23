import React, {useState} from 'react';
import Category from "../components/catalog/Category";
import ProductList from "../components/catalog/ProductList";
import Pagination from "../components/catalog/Pagination";


function Catalog(props) {

    const [category, setCategory] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);

    return (
        <div className="w-full">
            <div className="flex bg-gray-100">

                <div className="w-1/6 mt-36 bg-white rounded-md ml-10" >
                    <Category category={category} setCategory={setCategory} setPage={setPage}/>
                </div>
                <div className="w-4/6 pl-16 mb-28">
                    <ProductList category={category} setCategory={setCategory} page={page} setPage={setPage} setTotalPage={setTotalPage}/>
                    <Pagination page={page} setPage={setPage} totalPage={totalPage}/>
                </div>
            </div>
        </div>
    );
}

export default Catalog;