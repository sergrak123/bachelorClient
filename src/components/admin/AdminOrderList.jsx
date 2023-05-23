import React, {useEffect, useState} from 'react';
import {storeImg} from "../../utils/storeImages";
import axios from "axios";

function AdminOrderList(props) {
    const [orders, setOrders] = useState([]);

    async function getOrders(userId) {
        const url = "http://localhost:8080/orders/" + userId;
        const response = await axios.get(url)
        return response
    }

    useEffect(() => {
        getOrders(1).then(r => setOrders(r.data))
    }, [])
    return (
        <div>
            <div className="sm:flex-auto ml-1 mt-2 border-b border-gray-200 pb-5">
                <h1 className="text-xl font-semibold text-gray-900">Заказы</h1>
                <p className="mt-2 text-sm text-gray-700">
                    Список ваших заказов
                </p>
            </div>
            <div className="mt-7">

                <div className="space-y-5">
                    <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-x-6 lg:w-2/3 lg:flex-none lg:gap-x-8">

                            <dt className="font-medium text-gray-900 ml-6">Дата заказа</dt>
                            <dt className="font-medium text-gray-900">Номер заказа</dt>
                            <dt className="font-medium text-gray-900">Общая сумма</dt>
                            <dt className="font-medium text-gray-900">Статус заказа</dt>
                    </dl>
                    {orders?.reverse().map((order) => (
                        <div key={order.orderId}>
                            <div className="bg-gray-50 rounded-lg py-3 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">

                                <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-x-6 lg:w-2/3 lg:flex-none lg:gap-x-8">
                                    <div className="flex justify-between sm:block">
                                        {/*<dt className="font-medium text-gray-900">Дата заказа</dt>*/}
                                        <dd className="sm:mt-1">
                                            <time dateTime={order.orderTime}>{order.orderTime.substring(11,16)} {order.orderTime.substring(0,10)}</time>
                                        </dd>
                                    </div>

                                    <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                        {/*<dt className="font-medium text-gray-900">Номер заказа</dt>*/}
                                        <dd className="sm:mt-1">#{order.orderId}</dd>
                                    </div>
                                    <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                        {/*<dt className="font-medium text-gray-900">Общая сумма</dt>*/}
                                        <dd className="sm:mt-1">{order.amount} ₽</dd>
                                    </div>
                                    <div className="flex justify-between sm:block">
                                        {/*<dt className="font-medium text-gray-900">Дата заказа</dt>*/}
                                        <dd className="sm:mt-1">
                                            <span className="inline-flex rounded bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                Выполнен
                                            </span>
                                        </dd>
                                    </div>
                                </dl>

                                <div className="flex items-center">

                                    <button
                                        className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto sm:mt-0 cursor-pointer"
                                    >
                                        Подробная информация
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default AdminOrderList;