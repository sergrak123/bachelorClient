import {useContext, useEffect, useState} from 'react'
import {RadioGroup} from '@headlessui/react'
import {CheckCircleIcon, TrashIcon} from '@heroicons/react/solid'
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ArrowLeftIcon} from '@heroicons/react/outline'
import {storeImg} from "../utils/storeImages";
import {removeFromCart} from "../state";
import axios from "axios";
import {useDispatch} from "react-redux";
import {AuthContext} from "../context";
import { Switch } from '@headlessui/react'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Checkout() {
    const dispatch = useDispatch();
    const [shippingInfo, setShippingInfo] = useState({
        name: "",
        phone: "",
        city: "",
        street: "",
        house: "",
        flat: "",
        description: ""
    })
    let {state} = useLocation();
    const {authInfo} = useContext(AuthContext)
    const router = useNavigate()
    const [autoCompleted, setAutoCompleted] = useState(false)
    // console.log(state)
    // console.log(authInfo)

    async function createOrder() {
        const url = "http://localhost:8080/orders";
        const response = await axios.post(url,
            {
                userId: authInfo?.id,
                storeId: state?.storeId,
                cart: state?.items,
                amount: state?.totalAmount
            }
        )
    }

    function autoCompleteInputs(){
        setShippingInfo({
            name: authInfo.firstName,
            phone: authInfo.phoneNumber,
            city: authInfo.city,
            street: "",
            house: "",
            flat: "",
            description: ""
        })
    }

    function removeOrderedCart(items) {
        for (const item of items) {
            dispatch(removeFromCart({id: item.productId}))
        }
        console.log(items)
    }

    function removeInputs() {
        setShippingInfo({
            name: "",
            phone: "",
            city: "",
            street: "",
            house: "",
            flat: "",
            description: ""
        })
    }

    useEffect(()=>{
        if (autoCompleted)
            autoCompleteInputs()
        else
            removeInputs();
    },[autoCompleted])


    return (
        <div className="bg-white">
            <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">

                <div className="flex items-start mb-16">
                    <div className="w-1/3 mt-3">
                        <Link to="/cart">
                            <div className="flex items-center text-gray-400 cursor-pointer">
                                <ArrowLeftIcon className="h-4 w-4 mr-1 "/>
                                Вернуться в корзину
                            </div>
                        </Link>
                    </div>
                    <h1 className="text-3xl text-center tracking-tight sm:text-4xl text-gray-700 w-1/3">Оформление
                        заказа</h1>
                </div>

                <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    <div>
                        <div className="sm:col-span-2">
                            <div className="flex items-start justify-end">
                                <div className="ml-0 mr-4">
                                    <p className="text-base text-gray-400">
                                        Автозаполнить поля
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <Switch
                                        checked={autoCompleted}
                                        onChange={setAutoCompleted}
                                        className={classNames(
                                            autoCompleted ? 'bg-green-600' : 'bg-gray-200',
                                            'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 '
                                        )}
                                    >
                                        <span
                                            className={classNames(
                                                autoCompleted ? 'translate-x-5' : 'translate-x-0',
                                                'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                            )}
                                        />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-medium text-gray-900">Контактная информация</h2>

                            {/*<div className="mt-6">*/}
                            {/*    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">*/}
                            {/*        Email address*/}
                            {/*    </label>*/}
                            {/*    <div className="mt-3">*/}
                            {/*        <input*/}
                            {/*            type="email"*/}
                            {/*            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"*/}
                            {/*        />*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            <div className="mt-5 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-5">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                        Имя
                                    </label>
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-indigo-500 sm:text-sm"
                                            value={shippingInfo.name}
                                            onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                        Номер телефона
                                    </label>
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-indigo-500 sm:text-sm"
                                            value={shippingInfo.phone}
                                            onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 border-t border-gray-200 pt-6">
                            <h2 className="text-lg font-medium text-gray-900">Адрес доставки</h2>

                            <div className="mt-5 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div>
                                    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                        Город
                                    </label>
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-0 focus:border-indigo-500"
                                            value={shippingInfo.city}
                                            onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                        Улица
                                    </label>
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-indigo-500 sm:text-sm"
                                            value={shippingInfo.street}
                                            onChange={(e) => setShippingInfo({...shippingInfo, street: e.target.value})}
                                        />
                                    </div>
                                </div>

                                {/*<div>*/}
                                {/*    <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">*/}
                                {/*        Дом*/}
                                {/*    </label>*/}
                                {/*    <div className="mt-3">*/}
                                {/*        <input*/}
                                {/*            type="text"*/}
                                {/*            required*/}
                                {/*            className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-0 focus:border-indigo-500"*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}

                                {/*<div>*/}
                                {/*    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">*/}
                                {/*        Квартира*/}
                                {/*    </label>*/}
                                {/*    <div className="mt-3">*/}
                                {/*        <input*/}
                                {/*            type="text"*/}
                                {/*            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-indigo-500 sm:text-sm"*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}


                            </div>

                            <div className="mt-5 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                                <div>
                                    <label htmlFor="first-name"
                                           className="block text-sm font-medium text-gray-700 col-span-1">
                                        Дом
                                    </label>
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            required
                                            className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-0 focus:border-indigo-500"
                                            value={shippingInfo.house}
                                            onChange={(e) => setShippingInfo({...shippingInfo, house: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="last-name"
                                           className="block text-sm font-medium text-gray-700 col-span-1">
                                        Квартира
                                    </label>
                                    <div className="mt-3">
                                        <input
                                            type="text"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-indigo-500 sm:text-sm"
                                            value={shippingInfo.flat}
                                            onChange={(e) => setShippingInfo({...shippingInfo, flat: e.target.value})}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="mt-5 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                <div className="col-span-2">
                                    <div className="flex justify-between">
                                        <label
                                            className="block text-sm font-medium text-gray-700">
                                            Комментарий к заказу
                                        </label>
                                        <span className="text-sm text-gray-500">
                                                Макс. 250 символов
                                        </span>
                                    </div>
                                    <div className="mt-3">
                                            <textarea
                                                rows={4}
                                                className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                                                value={shippingInfo.description}
                                                onChange={(e) => setShippingInfo({
                                                    ...shippingInfo,
                                                    description: e.target.value
                                                })}
                                            />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Order summary */}
                    <div className="mt-10 lg:mt-0">
                        {/*<h2 className="text-lg font-medium text-gray-900">Order summary</h2>*/}

                        <div className=" bg-gray-50  rounded-lg shadow-md">
                            <div className="pt-10 pl-6">
                                <img
                                    src={storeImg().find(item => item.storeId === state?.storeId)?.src}
                                    className="object-center object-scale-down w-32 rounded-lg"/>
                            </div>

                            <dl className="py-6 px-4 space-y-6 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-600">Товаров</dt>
                                    <dd className="text-sm font-medium text-gray-600">{state?.totalQuantity}</dd>
                                </div>
                                {/*<div className="flex items-center justify-between">*/}
                                {/*    <dt className="text-sm">Shipping</dt>*/}
                                {/*    <dd className="text-sm font-medium text-gray-900">$5.00</dd>*/}
                                {/*</div>*/}
                                {/*<div className="flex items-center justify-between">*/}
                                {/*    <dt className="text-sm">Taxes</dt>*/}
                                {/*    <dd className="text-sm font-medium text-gray-900">$5.52</dd>*/}
                                {/*</div>*/}
                                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                                    <dt className="text-base font-medium">Итого</dt>
                                    <dd className="text-base font-medium text-gray-900">{state?.totalAmount} ₽</dd>
                                </div>
                            </dl>

                            <div className="pb-6 px-4 sm:px-6">
                                <button
                                    className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700"
                                    onClick={(e) => {
                                        //e.preventDefault()
                                        createOrder();
                                        removeOrderedCart(state?.items);
                                        router("/catalog")
                                    }}
                                >
                                    Оформить заказ
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
