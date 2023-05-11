/* This example requires Tailwind CSS v2.0+ */
import {CheckIcon, ClockIcon} from '@heroicons/react/solid'
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {useEffect, useState} from "react";
import {ArrowLeftIcon} from '@heroicons/react/outline'
import {changeCount, decreaseCount, removeFromCart} from "../state";
import {Link} from "react-router-dom";
import {storeImg} from "../utils/storeImages";


function totalCartAmount(cartItems) {
    const total = cartItems.reduce(
        (quantity, item) => item.price * item.quantity + quantity,
        0
    )
    return total
}

function totalQuantity(cartItems) {
    const total = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )
    return total
}

export default function ShoppingCart() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const [cartList, setCartList] = useState([]);

    //1
    function getItemQuantity(id) {
        return cart.find(item => item.id === id)?.count
    }

    async function getCart() {
        const url = "http://localhost:8080/cart";
        const response = await axios.post(url,
            [...cart]
        )
        setCartList(composeCart(response.data))
    }

    function composeCart(data) {
        let composedCart = [];
        Object.keys(data).forEach(key => {
            let value = data[key]
            composedCart.push({storeId: parseInt(key), items: value})
        });
        return composedCart
    }

    useEffect(() => {
        getCart()
    }, [cart])

    return (

        <div className="bg-white /*min-h-screen*/">
            <div className="max-w-4xl mx-auto py-14 px-4 sm:px-6 lg:px-0">

                {/*<Link to="/catalog">*/}
                {/*    <div className="flex items-center text-gray-500 cursor-pointer">*/}
                {/*        <ArrowLeftIcon className="h-5 w-5 mr-2 ml-4"/>*/}
                {/*        Вернуться в каталог*/}
                {/*    </div>*/}
                {/*</Link>*/}
                {/*<h1 className="text-3xl text-center tracking-tight sm:text-4xl text-gray-700">Ваша корзина</h1>*/}

                <h1 className="text-3xl text-center tracking-tight sm:text-4xl text-gray-600">Ваша корзина</h1>

                {/*<div className="flex items-start">*/}
                {/*    <div className="w-1/3 mt-3">*/}
                {/*        <Link to="/catalog">*/}
                {/*            <div className="flex items-center text-gray-400 cursor-pointer">*/}
                {/*                <ArrowLeftIcon className="h-4 w-4 mr-1 ml-4"/>*/}
                {/*                /!*Вернуться в каталог*!/*/}
                {/*            </div>*/}
                {/*        </Link>*/}
                {/*    </div>*/}
                {/*    <h1 className="text-3xl text-center tracking-tight sm:text-4xl text-gray-700 w-1/3">Ваша корзина</h1>*/}
                {/*</div>*/}


                <form className="mt-10">
                    <section aria-labelledby="cart-heading">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>
                        {cartList.map((cartInStore) => (
                            <div className="bg-gray-100 px-12 pb-12 pt-9 rounded-md mb-14 shadow-lg">
                                <div className="flex justify-between mb-6">
                                    <img
                                        src={storeImg().find(item => item.storeId === cartInStore.storeId)?.src}
                                        className="object-center object-scale-down w-28  ml-0 rounded"/>
                                    <div className="text-gray-500 flex items-center">
                                        <div className="mr-2">
                                            Позиций • {cartInStore.items?.length}
                                        </div>
                                        {/*#bd73e8*/}
                                        <div className="bg-white p-1.5 rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#bd73e8"
                                                 viewBox="0 0 16 16">
                                                <path d="M8.89 4.72a7.42 7.42 0 0 1-1.45 2.72c-.6.6-1.67 1.09-2.72 1.45a16.94 16.94 0 0 1-.8.25l-.27.08c-.39.1-.39.81 0 .92a21.17 21.17 0 0 1 1.07.33c1.05.36 2.11.84 2.72 1.45.6.6 1.09 1.67 1.45 2.72a16.94 16.94 0 0 1 .25.8l.08.27c.1.38.81.38.92 0a22.86 22.86 0 0 1 .27-.88 16.4 16.4 0 0 1 .06-.2c.36-1.04.84-2.1 1.45-2.71.6-.6 1.67-1.09 2.72-1.45a16.39 16.39 0 0 1 .8-.25l.27-.08c.39-.1.39-.82 0-.92a21.17 21.17 0 0 1-1.07-.33 7.44 7.44 0 0 1-2.72-1.45 7.44 7.44 0 0 1-1.45-2.72 16.4 16.4 0 0 1-.25-.8 22.85 22.85 0 0 1-.08-.27c-.1-.39-.81-.39-.92 0a21.17 21.17 0 0 1-.33 1.07ZM3.53.28a.4.4 0 0 0-.76 0l-.3.91a2 2 0 0 1-1.28 1.27l-.92.3a.4.4 0 0 0 0 .77l.92.3a2 2 0 0 1 1.27 1.28l.3.92a.4.4 0 0 0 .77 0l.3-.92a2 2 0 0 1 1.28-1.27l.91-.3a.4.4 0 0 0 0-.77l-.91-.3a2 2 0 0 1-1.27-1.28L3.53.28Z"></path>
                                            </svg>
                                        </div>


                                    </div>
                                </div>

                                {/*<h1>Магазин {cartInStore.storeId}</h1>*/}
                                <ul role="list" key={cartInStore.storeId}
                                    className="border-t border-b border-gray-200 divide-y divide-gray-200">
                                    {cartInStore.items?.map((product) => (
                                        <li key={product.productId} className="flex py-6">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={product.photoUrl}
                                                    alt={product.name}
                                                    className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                                                />
                                            </div>

                                            <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h4 className="text-sm">
                                                            <div
                                                                className="font-medium text-gray-700 hover:text-gray-800">
                                                                {product.name}
                                                            </div>
                                                        </h4>
                                                        <p className="ml-4 text-sm font-medium text-gray-900">{product.price * product.quantity} ₽</p>
                                                    </div>
                                                    {/*<p className="mt-1 text-sm text-gray-500">{product.quantity} шт</p>*/}
                                                    <p className="mt-1 text-sm text-gray-500">{product.quantity} x {product.price} ₽</p>

                                                    {/*<p className="mt-1 text-sm text-gray-500">{product.size}</p>*/}
                                                </div>

                                                <div className="mt-6 flex-1 flex items-end justify-between">
                                                    {/*1*/}
                                                    <div className="w-1/8">
                                                        <label className="block text-xs {/*font-medium*/} text-gray-600">
                                                            {/*Количество*/}
                                                        </label>
                                                        <select
                                                            className="mt-1.5 block w-full pl-3 pr-10 py-2 text-base border-gray-300 sm:text-xs rounded-md focus:outline-none focus:ring-0 focus:border-green-700"
                                                            onChange={e => {
                                                                dispatch(changeCount({
                                                                    item: {
                                                                        id: product.productId,
                                                                        count: parseInt(e.target.value) ,
                                                                    }
                                                                }))
                                                            }}
                                                            value={getItemQuantity(product.productId)}
                                                        >
                                                            {[1,2,3,4,5,6,7,8,9,10].map((item)=>(
                                                                <option value={item} key={item}>{item}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    {/*1*/}
                                                    <div className="ml-4">
                                                        <button type="button"
                                                                className="text-sm font-medium text-red-400 hover:text-red-500"
                                                                onClick={() => dispatch(removeFromCart({id: product.productId}))}
                                                        >
                                                            <span>Удалить</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <section aria-labelledby="summary-heading" className="mt-10 mb-3">
                                    <div>
                                        <dl className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <dt className="text-base font-medium text-gray-900">Итого</dt>
                                                <dd className="ml-4 text-base font-medium text-gray-900">{totalCartAmount(cartInStore.items)} ₽</dd>
                                            </div>
                                        </dl>
                                        {/*<p className="mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at*/}
                                        {/*    checkout.</p>*/}
                                    </div>

                                    <div className="mt-6">
                                        <Link to="/checkout"
                                              state={{
                                                  ...cartInStore,
                                                  totalAmount: totalCartAmount(cartInStore.items),
                                                  totalQuantity: totalQuantity(cartInStore.items)
                                              }}>
                                            <button
                                                className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 "
                                                onClick={(e) => {
                                                    //e.preventDefault()
                                                    console.log(cartInStore.items)
                                                }}>
                                                Оформить заказ
                                            </button>
                                        </Link>
                                    </div>
                                </section>
                            </div>

                        ))}
                    </section>
                    {cart?.length === 0
                        ?
                        <div className="flex justify-center items-center flex-col mt-20">
                            {/*<img src="https://yastatic.net/s3/lavka-web/public/assets/images/emptyCart@2x.png"*/}
                            {/*     className="h-32"/>*/}


                            <div className="w-1/3">
                                <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M54.62 112.28c-40.44 17.54-60.63 52.95-25.7 101.57 47.5 66.1 176.64 81.84 219.21 21.37 27.06-38.41 39.06-110.28 30.07-156.66C263.86 4.5 193.17-6.27 158.69 38.34c-31.7 41.02-38.47 45.48-104.07 73.94z"
                                          fill="#D8E0EC"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M209.84 116.1c4.6-.34 9.28 22.5 3.7 22.91-7.92.59-45.41 5.68-51.79 2.56-6.38-3.12-10.07-17.38.96-19.24 11.02-1.85 41.12-5.78 47.13-6.23z"
                                          fill="#F3B0A1"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M186.33 147.38l3.27-32.49s28.7-2.22 35.94 4.04c5.03 4.35 4.49 17.03.79 21.97-6.67 8.88-40 6.48-40 6.48z"
                                          fill="#fff"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M219.31 109.99c.2-3.09-15.3-1.47-14.21 1.95 2.81 8.85-2.32 15.36-2.32 15.36l15.4-4.15 1.13-13.16z"
                                          fill="#2AC846"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M144.38 75.44c-.23-1.19-2.69.71-2.47 3.29.26 3.05 2.94 6.46 2.94 6.46s-1.55 7.3.64 10.49c2.19 3.19 6.11.19 6.04-3.97-.2-10.7-5.77-9.19-7.15-16.27z"
                                          fill="#FFC0AF"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M143.05 97.75c-2.19.27-7.19-.94-9.76-6.62-.96-2.13-2.1-3.44-1.73-5.24.31-1.51 11.53-9.98 13.88-6.95 2.35 3.03 4.71 11.02 5.34 13.07.62 2.05-4.04 5.28-7.73 5.74z"
                                          fill="#FFC0AF"></path>
                                    <path d="M131.96 92.01s7.92-12.97 15.14-20.15c7.46-7.42 19.66-8.52 31.14 1.8"
                                          stroke="#2AC846" stroke-miterlimit="10" stroke-linecap="round"
                                          stroke-linejoin="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M140.05 76.58c-4.04.24-8.25 7.72-8.49 9.31-.11.73 3.12 2.42 4.73 2.58 2.88.28 6.43-7.41 6.23-9.23-.12-1.04-2.04-2.69-2.47-2.66zm11.05 14.85c.89 2.5 6.26 12.29 9.35 23.45 2.33 8.4-12.32 9.86-13.74 4.88-1.63-5.72-4.73-21.01-5.77-23.73-1.04-2.72 8.44-9.45 10.16-4.6zm-46.18 22.95l-40.65-3.25 3.6-16.43 36.82-.14.23 19.82z"
                                          fill="#FFC0AF"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M69.62 108.9s-8.81 5.64-19.66 6.3c-1.5-8.56-6.13-41.45-6.13-41.45s7.24-4.83 14.44 9.14c4.46 8.65 12.2 9.08 12.2 9.08s.43 2.89-2.24 6.67c.16 1.41 1.39 10.26 1.39 10.26z"
                                          fill="#C2CCDC"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M129.04 100.32c2.13.07 1.87-4.46.09-4.65-2.09-.22-10.55-.12-13.5.23-2.11.25-2.22 3.41.3 3.63 4.23.37 9.6.68 13.11.79zm-50.28 26.35l-29.91-17.44L53 94.6l33.66 13.89-7.9 18.18z"
                                          fill="#FFC0AF"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M212.72 180.2s-53.49-40.4-73.89-52.85c-28.46-17.36-60.74-23.38-60.74-23.38s-10.18 9.66-10.33 27.71c24.63 11.09 45.76 15.76 45.76 15.76s38.76 63.13 66.66 60.35c11.08-1.11 32.54-27.59 32.54-27.59z"
                                          fill="#86868B"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M192.23 162.44l33.83 18.32s-16.96 29.68-42.24 27.51c-29.77-2.56-32.46-34.29-47.36-79.66-26.11-16.68-51.42-22.94-51.42-22.94l.64-11.87s46.67-.25 59.57 3.38c6.27 1.76 13.24 7.56 17.76 14.19 4.52 6.63 29.22 51.07 29.22 51.07z"
                                          fill="#95949A"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M166.84 117.63s-6.15-11.77-11.75-14.93c.14 14.34 10.58 48.38 21.78 57.35.2-17.82-1.05-24.58-1.05-24.58l-8.98-17.84zm15.02 70.81c.14 14.34 2.69 17.68 4.17 20.1 5.28 0 8.05-1.76 8.05-1.76s-6.62-15.18-12.22-18.34z"
                                          fill="#86868B"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M231.91 108.62l-26.16 13.45s-7.42 12.93-24.76 34.59c-4.4 33.78 2.67 44.05 11.77 51.08 33.31-7.84 44.11-47.46 48.95-65.17 4.07-14.88-9.8-33.95-9.8-33.95z"
                                          fill="#fff"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M163.29 112.02c1.37 3.77 12.05 1.58 12.49-1.1.44-2.69-2.65-10.65-3.13-12.96-.22-1.04-3.18-3.36-5.65-10.26-3.42.58-8.62 8.32-8.23 11.16.29 2.11 2.9 10.02 4.52 13.16z"
                                          fill="#FFC0AF"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M174.49 81.02c-1.83.84-7.18 3.34-8.04 4.95-.87 1.61-.6 6.75-1.05 8.66-.45 1.91 10.38 18.27 10.58 13.94.23-4.81 3.88-10.86 3.94-12.6.07-1.88-2-6.11-2.54-10.51-.1-.79-2.16-.48-2.68 1.51-.79 3.02.51 5.81-.11 6.7-.62.89-3.46.63-3.51-1.31-.05-1.94.27-4.77.27-4.77s2.39-1.66 3.64-3.45c1.04-1.5.43-3.55-.5-3.12zm61.84 15c-3.42 7.05-4.85 10.31-1.79 16.01-4.57 5.64-22.92 12.64-28.79 10.05 6.46-3.15 8.3-11.44 9.2-22.49 0-.01 15.25-2.5 21.38-3.57z"
                                          fill="#FFC0AF"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M176.85 76.41s-6.2 5.14-5.14 8.43c.63 1.95 3.4 2 3.93.46.53-1.54 1.61-7.6 2.29-8.55-.58-.47-1.08-.34-1.08-.34z"
                                          fill="#fff"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M159.6 285.38s10.07 2.89 12.84-.67c1.63-2.1-.34-5.12-2.39-4.56-2.05.56-9.35 3.86-10.87 3.82-.1.96.42 1.41.42 1.41z"
                                          fill="#D8E0EC"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M240.51 227.04s8.08-6.67 6.71-10.96c-.81-2.53-4.42-2.62-5.11-.61-.69 2.01-2.11 9.89-3 11.13.75.62 1.4.44 1.4.44z"
                                          fill="#fff"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M51.48 111.07S41.1 112.44 31 108.43c2.28-8.39 12.05-40.13 12.05-40.13s8.6-1.3 9.2 14.4c.37 9.73 7.19 13.4 7.19 13.4s-.84 2.8-4.86 5.09c-.46 1.35-3.1 9.88-3.1 9.88z"
                                          fill="#D8E0EC"></path>
                                    <path clip-rule="evenodd"
                                          d="M55.39 92.55s-7.02.27-10.49 4.99c-2.63 3.59.57 5.15 2.7 3.73 2.24-1.47 7.79-8.72 7.79-8.72zm8.28-1.99s2.96-6.37.34-11.61c-1.99-3.98-4.84-1.85-4.56.7.31 2.66 4.22 10.91 4.22 10.91z"
                                          stroke="#C2CCDC" stroke-miterlimit="10" stroke-linecap="round"
                                          stroke-linejoin="round"></path>
                                    <path d="M36.04 107.72L47.6 69.23m20.27 8.36s.84 9.93-5.61 13.77" stroke="#C2CCDC"
                                          stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M214.65 71.71c-5.23 4.05-4.83 8.57-7.22 12.91-2.86 5.17-4.41 10.11-4.1 14.39.6 8.25 17.39 8.22 20.33 4.34 5.23-6.91 19.11-16.95 17.25-22.3-2.91-8.38-19.82-14.33-26.26-9.34z"
                                          fill="#FFC0AF"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M224.46 70.61c-2.95-2.52-13.79-2.51-12.45 3.52 5.14-.37 7.04 5.36 7.04 5.36s3.6-7.13 5.41-8.88z"
                                          fill="#855E4D"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M210.68 85.61s-5.51-2.13-6.06.46c-.32 1.5 3.73 4.54 3.73 4.54l2.33-5z"
                                          fill="#FFC0AF"></path>
                                    <path d="M207.91 94.14c-1.1.18-2.26-.04-2.26-.04" stroke="#E29078"
                                          stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path
                                        d="M213.13 85.97c.35-.78.13-1.64-.5-1.92-.62-.27-1.41.13-1.76.92-.35.78-.12 1.64.5 1.92.63.28 1.42-.13 1.76-.92z"
                                        fill="#855E4D"></path>
                                    <path d="M212.29 80.71s1.69.26 2.81 1.96" stroke="#855E4D" stroke-miterlimit="10"
                                          stroke-linecap="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M225.24 95.03c1.19 5.83-.08 8.5 8.1 8.51l3-7.52s-8.6-.69-11.1-.99z"
                                          fill="#855E4D"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M226.32 88.07s10.35 18.49 14.75 19.24 9.1-1.19 9.1-1.19L239.18 87.2l-12.86.87z"
                                          fill="#219F38"></path>
                                    <path
                                        d="M215.31 79.61c3.21 3.77 10.06 8.78 13.71 10.91 8.13 1.73 12.26.31 12.26.31s8.89-15.91-11.22-23.61c-8.01-3.07-15.11-.61-17.03 3.24.99.46 5.33 3.97 2.28 9.15z"
                                        fill="#fff"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M219.83 97.53c-2.19-2.07 3.08-9.82 7.95-9.56 4.87.25 5.8 4.89 2.52 8.13-4.47 4.42-9.42 2.43-10.47 1.43z"
                                          fill="#FFC0AF"></path>
                                    <path d="M216.33 78.72s-3.73-2-5.65-3.33" stroke="#E6E8EA" stroke-miterlimit="10"
                                          stroke-linecap="round"></path>
                                    <path
                                        d="M211.9 73.69c0-1.59 2.01-5.39 7.42-2.16M213.04 71.7c1.92-2.67 6.28 1.37 6.7 3.69"
                                        stroke="#855E4D" stroke-miterlimit="10" stroke-linecap="round"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M178.86 75.96s8.02.72 9.59-2.36c.93-1.82-1-3.82-2.46-3.09-1.46.72-6.5 3.81-7.65 4-.1 1.17.52 1.45.52 1.45z"
                                          fill="#fff"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M179.31 75.59s4.59-6.62 2.68-9.5c-1.13-1.71-3.81-1.02-3.91.61-.1 1.63.1 7.53-.31 8.63 1 .66 1.54.26 1.54.26z"
                                          fill="#fff"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M178.33 74.45s-7.48-2.98-9.86-.48c-1.41 1.48-.13 3.94 1.48 3.67 1.61-.27 7.32-1.79 8.48-1.64.42-1.11-.1-1.55-.1-1.55z"
                                          fill="#fff"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M179.9 75.04s-2.82-7.54-6.28-7.62c-2.04-.05-3.01 2.55-1.72 3.56 1.28 1.01 6.24 4.21 6.92 5.17 1.1-.43 1.08-1.11 1.08-1.11z"
                                          fill="#fff"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M177.13 76.8c.75.79 2.72-.11 3.46-.94.74-.83-.66-3.17-2.35-2.2-1.61.93-1.52 2.71-1.11 3.14z"
                                          fill="#FDCA00"></path>
                                    <path d="M166.1 87.06s-.49 1.84-.41 4.74m-23.17-10.14s-2.31 6.38-5.48 7.2"
                                          stroke="#E29078" stroke-miterlimit="10" stroke-linecap="round"
                                          stroke-linejoin="round"></path>
                                    <path d="M144.7 86.39s-1.15 1.86-1.37 6.07m-.81-13.98s-.53 3.23 2.18 7.56" stroke="#fff"
                                          stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M71.83 128.19s13.46 5.79 25.52 7.3" stroke="#95949A" stroke-miterlimit="10"
                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path d="M150.83 123.51s4.26 44 23 62.22" stroke="#86868B" stroke-miterlimit="10"
                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path
                                        d="M221.91 110.89c-2.17 2.03-1.18 7.56-5.12 13.02-3.76 5.21-10.1 8.09-17.35 25.14-2.96 6.97-14.79 30.14-14.76 36.03.03 7.21 21.38 14.41 26.55 13.92 15.09-1.44 30-53.15 31.2-61.09 2.12-14.09-2.4-17.77.03-27.4-7.86 2.92-17.43-2.53-20.55.38z"
                                        fill="#2AC846"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M215.53 123.93c4.28-1.71 13.65 15.44 8.46 17.52-7.38 2.95-40.13 20.13-47.22 20.47-8.38.4-12.66-13.51-2.71-18.61s35.87-17.13 41.47-19.38z"
                                          fill="#FFC0AF"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M232.06 126.22c4.28 11.54-1.48 32.23-14.93 35.43-17.45 4.15-20.22-14.36-11.9-26.93 9.82-14.86 23.53-17.38 26.83-8.5z"
                                          fill="#fff"></path>
                                    <path
                                        d="M231.09 128.24s-20.56 10.59-29.76 15.61c-1.51 6.71-.21 13.29 4.33 16.45 8.51-3.09 28.14-13.06 25.43-32.06z"
                                        fill="#E6E8EA"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M169.36 156.86c5.17 8.23 17.62 3.71 18.25-2.11.91-8.4-11.78-32.91-12.26-49.16-.2-6.65-13.34-3.6-12.28 5.47.9 7.77 3.63 41.56 6.29 45.8z"
                                          fill="#FFC0AF"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M199.98 157l-12.07-27.66s21.94-13.23 34.27-11.56c6.59.9 13.08 8.26 10.43 17.52-3.05 10.68-32.63 21.7-32.63 21.7z"
                                          fill="#fff"></path>
                                    <path clip-rule="evenodd"
                                          d="M249.29 117.78l-154.22 24.8 13.81 65.96h112.65l27.76-90.76z" stroke="#fff"
                                          stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                                    <path
                                        d="M280.41 103.54l-21.89 6.32a14.38 14.38 0 00-9.75 9.6l-2.07 6.75m-58.07 1.33l-8.17 80.61m-44.94-72.08l10.1 71.81m-43.57-32.13l134.55-16.49"
                                        stroke="#fff" stroke-miterlimit="10" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                    <path
                                        d="M125.91 291.89a8.65 8.65 0 100-17.3 8.65 8.65 0 000 17.3zm133.69 0a8.65 8.65 0 100-17.3 8.65 8.65 0 000 17.3z"
                                        stroke="#C2CCDC" stroke-miterlimit="10" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                    <path
                                        d="M125.91 283.24L193.06 215a14.5 14.5 0 0122.39 2.12l44.15 66.13m20.81-179.71l-19.76 5.34m-151.77 99.66h112.65"
                                        stroke="#fff" stroke-width="3" stroke-miterlimit="10" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                    <path
                                        d="M125.91 288.44a5.2 5.2 0 100-10.4 5.2 5.2 0 000 10.4zm133.69 0a5.2 5.2 0 100-10.4 5.2 5.2 0 000 10.4z"
                                        fill="#C2CCDC"></path>
                                    <path
                                        d="M207.42 132.82l4.04 8.11m-3.16-12.74c.47.95 1.13 2.5-.2 3.75-.91.86-2.71 2.35-3.76 3.21a1.3 1.3 0 00-.34 1.59l2.65 5.32c.26.52.84.81 1.41.7l3.02-.57m-10.14-2.93a.89.89 0 100-1.78.89.89 0 000 1.78zm2.52 5.06a.89.89 0 100-1.78.89.89 0 000 1.78z"
                                        stroke="#E6E8EA" stroke-miterlimit="10" stroke-linecap="round"></path>
                                    <path d="M204.35 183.02s5.86 4.18 17.19 5.42m-13.05-13.96s5.86 4.18 17.19 5.42"
                                          stroke="#219F38" stroke-miterlimit="10" stroke-linecap="round"></path>
                                    <path d="M233.45 70.81s.17 9.43-4.25 14.45" stroke="#E6E8EA" stroke-miterlimit="10"
                                          stroke-linecap="round"></path>
                                    <path
                                        d="M234.87 69.49c-.17.41-1.02.1-1.53-.15-.42-.2-1.03-.6-.86-1.01.17-.41.91-.49 1.56-.19.67.31 1 .94.83 1.35z"
                                        fill="#219F38"></path>
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                          d="M78.09 103.97s-4.06 3.93-6.74 10.41c17.07 5.06 36.58 4.6 44.25 2.54-8.8-4.53-27.18-11.18-37.51-12.95z"
                                          fill="#95949A"></path>
                                    <path d="M85.05 105.54s11.49 2.47 27.88 10.09" stroke="#fff" stroke-miterlimit="10"
                                          stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                            </div>

                            <div className="flex justify-center text-3xl text-gray-600 mt-7">
                                В корзине пока пусто
                            </div>
                            <div className="text-gray-400 mt-2 text-center">
                                Чтобы оформить заказ, положите
                                <br/>
                                в нее товары
                            </div>


                        </div>
                        :
                        null
                    }

                </form>
            </div>
        </div>
    );
}
