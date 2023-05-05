import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
    addToCart,
    decreaseCount,
    increaseCount,
} from "../state";
import axios from "axios";
import Card from "../pages/Card";


export default function ProductList({category, setCategory, page, setPage, setTotalPage}) {

    const [products, setProducts] = useState([]);
    const [modal, setModal] = useState(false);
    const [product, setProduct] = useState({});
    const size = 8;
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);

    async function getAllProducts() {
        const url = "http://localhost:8080/products/custom";
        const response = await axios.get(url, {
            params: {
                category,
                page,
                size,
            }
        })
        console.log(response)
        setProducts(response.data.content)
        setTotalPage(response.data.totalPages)
    }

    async function getProductCard(name) {
        const url = "http://localhost:8080/products/get";
        const response = await axios.get(url, {
            params: {
                name
            }
        })
        console.log(response)
        setProduct(response.data)
    }

    function getItemQuantity(id) {
        return cart.find(item => item.id === id)?.count || 0
    }


    useEffect(() => {
        getAllProducts()
    }, [category, page])

    function setProductCard({name, photoUrl, minPrice, minStore}) {
        //добавить get запрос для получения полной информации по продукту и всем ценам
        //set временное решение для тех карточек у которых нет данных в бд
        setProduct({name, photoUrl, minPrice, minStore})
        getProductCard(name)

    }

    return (
        <div className="bg-gray-100 m-1 w-full">
            <Card open={modal} setOpen={setModal} product={product}/>
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-18 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className=" mb-10 text-xl">Продукты</h1>

                <div
                    className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group">
                            {/*<Link to="/card">*/}
                            <div
                                className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 cursor-pointer"
                                onClick={() => {
                                    setModal(true)
                                    setProductCard(product)
                                }}>
                                <img
                                    src={product.photoUrl}
                                    alt={""}
                                    className="h-full w-full object-cover object-center hover:opacity-75"
                                />
                            </div>

                            <h3 className="mt-4 text-sm text-gray-700 h-10">{product.name}</h3>
                            <div className="m-auto justify-between flex mt-2 items-end {/*снизу*/}">
                                <p className="mt-1 text-l font-medium text-gray-900 mr-0 ">от {product.minPrice} ₽</p>
                                {}
                                <div className="mt-auto">
                                    {getItemQuantity(product.id) === 0
                                        ? (
                                            <button
                                                className="{/*mr-2*/} w-10 h-8 {/*bg-cyan-700*/} {/*bg-emerald-600*/} bg-gray-700 {/*bg-blue-500*/} rounded-md text-white {/*hover:opacity-70*/} hover:bg-gray-800 select-none"
                                                onClick={() => dispatch(addToCart({
                                                    item: {
                                                        id: product.id,
                                                        count: 1,
                                                        storeId: product.minStore
                                                    }
                                                }))}>+
                                            </button>)
                                        : (
                                            <div className="flex justify-center items-center my-0.5">
                                                <button
                                                    className="flex items-center justify-center w-8 h-7 rounded-md text-gray-800 hover:bg-gray-300 select-none bg-gray-200"
                                                    onClick={() => dispatch(decreaseCount({id: product.id}))
                                                    }>
                                                    -
                                                </button>
                                                <div className="px-2.5 select-none">
                                                    {getItemQuantity(product.id)}
                                                </div>
                                                <button
                                                    className="flex items-center justify-center w-8 h-7 rounded-md text-gray-800 hover:bg-gray-300 select-none bg-gray-200"
                                                    onClick={() => dispatch(increaseCount({id: product.id}))
                                                    }>+
                                                </button>
                                            </div>
                                        )}
                                </div>

                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}