/* This example requires Tailwind CSS v2.0+ */
import {CheckIcon, ClockIcon} from '@heroicons/react/solid'
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {useEffect, useState} from "react";
import {ArrowLeftIcon} from '@heroicons/react/outline'
import {decreaseCount, removeFromCart} from "../state";
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

        <div className="bg-white min-h-screen">
            <div className="max-w-4xl mx-auto py-14 px-4 sm:px-6 lg:px-0">

                {/*<Link to="/catalog">*/}
                {/*    <div className="flex items-center text-gray-500 cursor-pointer">*/}
                {/*        <ArrowLeftIcon className="h-5 w-5 mr-2 ml-4"/>*/}
                {/*        Вернуться в каталог*/}
                {/*    </div>*/}
                {/*</Link>*/}
                {/*<h1 className="text-3xl text-center tracking-tight sm:text-4xl text-gray-700">Ваша корзина</h1>*/}

                <h1 className="text-3xl text-center tracking-tight sm:text-4xl text-gray-700">Ваша корзина</h1>

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
                                <div className="flex justify-between">
                                    <img
                                        src={storeImg().find(item => item.storeId === cartInStore.storeId)?.src}
                                        className="object-center object-scale-down w-28 mb-6 ml-0 rounded"/>
                                    <div className="text-gray-600 flex items-baseline">
                                        <div className="mr-2">
                                            {cartInStore.items?.length} шт
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="purple"
                                             viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                  d="M8.89 4.72a7.42 7.42 0 0 1-1.45 2.72c-.6.6-1.67 1.09-2.72 1.45a16.94 16.94 0 0 1-.8.25l-.27.08c-.39.1-.39.81 0 .92a21.17 21.17 0 0 1 1.07.33c1.05.36 2.11.84 2.72 1.45.6.6 1.09 1.67 1.45 2.72a16.94 16.94 0 0 1 .25.8l.08.27c.1.38.81.38.92 0a22.86 22.86 0 0 1 .27-.88 16.4 16.4 0 0 1 .06-.2c.36-1.04.84-2.1 1.45-2.71.6-.6 1.67-1.09 2.72-1.45a16.39 16.39 0 0 1 .8-.25l.27-.08c.39-.1.39-.82 0-.92a21.17 21.17 0 0 1-1.07-.33 7.44 7.44 0 0 1-2.72-1.45 7.44 7.44 0 0 1-1.45-2.72 16.4 16.4 0 0 1-.25-.8 22.85 22.85 0 0 1-.08-.27c-.1-.39-.81-.39-.92 0a21.17 21.17 0 0 1-.33 1.07ZM3.53.28a.4.4 0 0 0-.76 0l-.3.91a2 2 0 0 1-1.28 1.27l-.92.3a.4.4 0 0 0 0 .77l.92.3a2 2 0 0 1 1.27 1.28l.3.92a.4.4 0 0 0 .77 0l.3-.92a2 2 0 0 1 1.28-1.27l.91-.3a.4.4 0 0 0 0-.77l-.91-.3a2 2 0 0 1-1.27-1.28L3.53.28Z"></path>
                                        </svg>

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
                                                        <p className="ml-4 text-sm font-medium text-gray-900">{product.price} ₽</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">{product.quantity} шт</p>
                                                    {/*<p className="mt-1 text-sm text-gray-500">{product.size}</p>*/}
                                                </div>

                                                <div className="mt-4 flex-1 flex items-end justify-between">
                                                    <p className="flex items-center text-sm text-gray-700 space-x-2">

                                                    </p>
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
                                                    // e.preventDefault()
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
                        ? <div className="flex justify-center items-center flex-col mt-32">
                            <img src="https://yastatic.net/s3/lavka-web/public/assets/images/emptyCart@2x.png"
                                 className="h-32"/>
                            <div className="flex justify-center text-3xl text-gray-400 mt-7">
                                В корзине пока пусто
                            </div>
                            <div className="text-gray-900 mt-2">
                                Чтобы оформить заказ, положите в нее товары
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
