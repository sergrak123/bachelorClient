import React, {useEffect, useState} from "react";
import axios from "axios";


export default function ProductList() {

    const [products, setProducts] = useState([]);

    async function getResponse() {
        const response = await axios.get("http://192.168.1.67:8080/products")
        console.log(response)
        setProducts(response.data)
    }

    useEffect(() => {
        getResponse()
    }, [])

    return (
        <div className="bg-gray-100 m-1 w-full">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-18 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className=" mb-10 text-xl">Продукты</h1>

                <div
                    className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group">
                            <div
                                className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                <img
                                    src={product.photoUrl}
                                    alt={""}
                                    className="h-full w-full object-cover object-center /*group-*/ hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700 h-10">{product.name}</h3>
                            <div className="m-auto justify-between flex mt-2 items-end {/*снизу*/}">
                                <p className="mt-1 text-l font-medium text-gray-900 mr-0 ">от {product.price} ₽</p>
                                <button
                                    className="{/*mr-2*/} w-10 h-8 {/*bg-cyan-700*/} {/*bg-emerald-600*/} bg-gray-700 {/*bg-blue-500*/} rounded-md text-white {/*hover:opacity-70*/} hover:bg-gray-800">+
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}