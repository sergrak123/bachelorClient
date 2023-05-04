/* This example requires Tailwind CSS v2.0+ */
import {CheckIcon, ClockIcon} from '@heroicons/react/solid'
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import {useEffect, useState} from "react";
import {decreaseCount, removeFromCart} from "../state";

// const products = [
//     {
//         id: 1,
//         name: 'Rich Bitter тоник-мандарин 1 л',
//         href: '#',
//         price: '$32.00',
//         color: '',
//         size: '',
//         inStock: true,
//         imageSrc: 'https://clck.ru/346Lpt',
//         imageAlt: 'Front side of mint cotton t-shirt with wavey lines pattern.',
//     },
//     {
//         id: 2,
//         name: 'Добрый кола 1,5 л',
//         href: '#',
//         price: '$32.00',
//         color: '',
//         inStock: false,
//         leadTime: '7-8 years',
//         size: '',
//         imageSrc: 'https://clck.ru/346Loe',
//         imageAlt: 'Front side of charcoal cotton t-shirt.',
//     },
//     // More products...
// ]

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

    function composeCart(data){
        let composedCart = [];
        Object.keys(data).forEach(key => {
            let value = data[key]
            composedCart.push({storeId: key, items: value})
        });
        return composedCart
    }

    useEffect(() => {
        getCart()
    }, [cart])

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-2xl mx-auto py-14 px-4  sm:px-6 lg:px-0">
                <h1 className="text-3xl  text-center tracking-tight text-gray-900 sm:text-4xl">Корзина</h1>

                <form className="mt-12">
                    <section aria-labelledby="cart-heading">
                        <h2 id="cart-heading" className="sr-only">
                            Items in your shopping cart
                        </h2>
                        {cartList.map((cartInStore) => (
                            <div>
                                <h1>Магазин {cartInStore.storeId}</h1>
                                <ul role="list" key={cartInStore.storeId} className="border-t border-b border-gray-200 divide-y divide-gray-200">
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
                            </div>

                        ))}
                    </section>
                    {cart?.length === 0
                        ? <div className="flex justify-center items-center flex-col mt-24">
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
                        <section aria-labelledby="summary-heading" className="mt-10">
                            <h2 id="summary-heading" className="sr-only">
                                Order summary
                            </h2>

                            <div>
                                <dl className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-base font-medium text-gray-900">Итого</dt>
                                        <dd className="ml-4 text-base font-medium text-gray-900">$96.00</dd>
                                    </div>
                                </dl>
                                <p className="mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at
                                    checkout.</p>
                            </div>

                            <div className="mt-10">
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                                    Оформить заказ
                                </button>
                            </div>
                        </section>
                    }

                </form>
            </div>
        </div>
    );
}
