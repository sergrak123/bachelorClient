/* This example requires Tailwind CSS v2.0+ */
import axios from "axios";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context";
import {storeImg} from "../utils/storeImages";
import {useSelector} from "react-redux";

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const {authInfo} = useContext(AuthContext)
    // const cart = useSelector((state) => state.cart.cart);



    async function getOrders(userId) {
        const url = "http://localhost:8080/orders/" + userId;
        const response = await axios.get(url)
        return response
    }

    useEffect(() => {
        console.log("Загрузка истории заказов...")
        getOrders(authInfo?.id).then(r => setOrders(r.data))
        console.log("Загрузка истории заказов - завершена")
    }, [window.location.pathname])

    return (
        <div className="bg-white">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8">
                <div className="max-w-xl">
                    <h1 className="text-2xl tracking-tight text-gray-700 sm:text-4xl">История заказов</h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Просмотреть информацию о своих последних заказах
                    </p>
                </div>

                <div className="mt-16">

                    <div className="space-y-20">
                        {orders?.map((order) => (
                            <div key={order.orderId}>
                                <div className="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">

                                    <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                        <div className="flex justify-between sm:block">
                                            <dt className="font-medium text-gray-900">Дата заказа</dt>
                                            <dd className="sm:mt-1">
                                                <time dateTime={order.orderTime}>{order.orderTime.substring(0,10)}</time>
                                            </dd>
                                        </div>
                                        <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                            <dt className="font-medium text-gray-900">Номер заказа</dt>
                                            <dd className="sm:mt-1">#{order.orderId}</dd>
                                        </div>
                                        <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                            <dt className="font-medium text-gray-900">Общая сумма</dt>
                                            <dd className="sm:mt-1">{order.amount} ₽</dd>
                                        </div>
                                    </dl>

                                    <div className="flex items-center">
                                        <div>
                                            <img
                                                src={storeImg().find(item => item.storeId === order.storeId)?.src}
                                                className="object-center object-scale-down w-24  ml-0 rounded-md mr-2"/>
                                        </div>
                                        <button
                                            className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto sm:mt-0 cursor-pointer"
                                        >
                                            Информация по доставке
                                        </button>
                                    </div>

                                </div>

                                <table className="mt-4 w-full text-gray-500 sm:mt-6">
                                    <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                                    <tr>
                                        <th scope="col" className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal font-medium text-gray-900">
                                            Продукт
                                        </th>
                                        <th scope="col" className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell font-medium text-gray-900">
                                            Стоимость
                                        </th>
                                        <th scope="col" className="hidden pr-8 py-3 font-normal sm:table-cell font-medium text-gray-900">
                                            Количество
                                        </th>
                                        <th scope="col" className="w-0 py-3 font-normal text-right pr-6">
                                            Итого
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                                    {order.cart?.map((product) => (
                                        <tr key={product.productId}>
                                            <td className="py-6 pr-8">
                                                <div className="flex items-center">
                                                    <img
                                                        src={product.photoUrl}
                                                        className="w-16 h-16 object-center object-cover rounded mr-6"
                                                    />
                                                    <div>
                                                        <div className="font-medium text-gray-900">{product.name}</div>
                                                        <div className="mt-1 sm:hidden">{product.price} ₽</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden py-6 pr-8 sm:table-cell">{product.price} ₽</td>
                                            <td className="hidden py-6 pr-8 sm:table-cell">{product.quantity}</td>
                                            {/*<td className="py-6 font-medium text-right whitespace-nowrap">*/}
                                            {/*    <a href={product.href} className="text-indigo-600">*/}
                                            {/*        View<span className="hidden lg:inline"> Product</span>*/}
                                            {/*        <span className="sr-only">, {product.name}</span>*/}
                                            {/*    </a>*/}
                                            {/*</td>*/}
                                            <td className="hidden py-6 sm:table-cell text-end pr-5">{product.price* product.quantity} ₽</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>



            </div>
            {orders?.length === 0 &&
                <div className="h-full flex justify-center">
                    <div className="text-2xl text-gray-500">
                        У вас еще нет заказов
                    </div>
                </div>
                }
        </div>
    )
}
