import {useEffect, useState} from "react";
import axios from "axios";
import AddingProduct from "./AddingProduct";

// const products = [
//     {
//         name: 'Lindsay WaltonLindsay Walton',
//         category: 'Соки',
//         price: '200',
//         parameter: '500 мл',
//         image:
//             'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//     },
//     // More people...
// ]


export default function AdminProductList() {

    const [products, setProducts] = useState([]);

    async function getProductList() {
        const url = "http://localhost:8080/products/custom";
        const response = await axios.get(url, {
            params: {
                page : 0,
                size: 8,
            }
        })
        // console.log(response)
        setProducts(response.data.content)
    }

    useEffect(() => {
        getProductList()
    }, [])
    const [modal, setModal] = useState(false);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <AddingProduct open={modal} setOpen={setModal}/>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Продукты</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Список всех продуктов в вашем магазине
                    </p>
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 sm:w-auto"
                        onClick={()=>setModal(true)}
                    >
                        + Добавить
                    </button>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Продукт
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Категория
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Стоимость
                                    </th>
                                    <th scope="col"
                                        className="px-1 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Краткая характеристика
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Изменить</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {products.map((product) => (
                                    <tr key={product.name}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                            <div className="flex items-center w-64">
                                                <div className="h-16 w-16 flex-shrink-0">
                                                    <img className="h-16 w-16 rounded" src={product.photoUrl} alt="product"/>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="font-medium text-gray-900">{product.name}</div>
                                                    {/*<div className="text-gray-500">{product.email}</div>*/}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <div className="text-gray-900">{product.category}</div>
                                            {/*<div className="text-gray-500">{product.department}</div>*/}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            <span className="inline-flex {/*rounded-full bg-green-100*/} px-2 text-xs font-semibold leading-5 text-green-800">
                                                <div className="text-gray-500">{product.minPrice} ₽</div>
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.parameter}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <a href="src/components/admin/AdminProductList#" className="text-gray-600 hover:text-gray-700">
                                                Изменить<span className="sr-only">, {product.name}</span>
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
