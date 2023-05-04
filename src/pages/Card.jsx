import {Fragment, useEffect, useRef, useState} from 'react'
import {Dialog, RadioGroup, Transition} from '@headlessui/react'
import {ShieldCheckIcon, XIcon} from '@heroicons/react/outline'
import {CheckIcon, QuestionMarkCircleIcon, StarIcon} from '@heroicons/react/solid'
import {useDispatch, useSelector} from "react-redux";
import lentLogo from "../images/logo-lenta.png"
import metroLogo from "../images/Metro.png"
import vkusvillLogo from "../images/vkusvill.png"
import {
    addToCart,
} from "../state";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function getCounts(n) {
    let result = []
    for (let i = 1; i <= n; i++) {
        result.push(i)
    }
    return result;
}

export default function Card({open, setOpen, product}) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const [selectedProduct, setSelectedProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    let completeButtonRef = useRef(null)

    //используем props как переменную напрямую без перезаписи,если нужен state то используем useEffect+ depth за изменением props
    useEffect(() => {
        if (product?.cartUnits?.[0] != null)
            setSelectedProduct(product.cartUnits?.[0])
    }, [product])


    let storeImg = [
        {storeId: 1, name: "Лента", src: lentLogo},
        {storeId: 2, name: "Метро", src: metroLogo},
        {storeId: 3, name: "Вкусвилл", src: vkusvillLogo}
    ];

    function getItemQuantity(id) {
        return cart.find(item => item.id === id)?.count
    }

    // let user = storeImg.find(item => item.storeId === 1).src;
    // console.log(user)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" initialFocus={completeButtonRef} className="fixed z-10 inset-0 overflow-y-auto"
                    onClose={() => {
                        setOpen(false)
                        setQuantity(1)
                    }}>
                <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4" style={{fontSize: 0}}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay
                            className="hidden fixed inset-0 bg-gray-800 /*bg-gray-500*/ bg-opacity-75 transition-opacity md:block"/>
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden md:inline-block md:align-middle md:h-screen"
                          aria-hidden="true">&#8203;</span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        enterTo="opacity-100 translate-y-0 md:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 md:scale-100"
                        leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                    >
                        <div
                            className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-4xl">
                            <div
                                className="w-full relative flex items-center bg-white rounded-xl px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 lg:pt-16">

                                <button
                                    type="button"
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                    onClick={() => {
                                        setOpen(false)
                                        setQuantity(1)
                                    }}
                                >
                                    <XIcon className="h-6 w-6"/>
                                </button>

                                <div
                                    className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start grid-cols-12 lg:gap-x-8">
                                    <div className="sm:col-span-4 lg:col-span-5">
                                        <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                                            <img src={product.photoUrl}
                                                 className="object-center object-cover"/>
                                        </div>
                                        {/*<p className="absolute top-4 left-4 text-center sm:static sm:mt-6">*/}
                                        {/*    <a */}
                                        {/*       className="font-medium text-indigo-600 hover:text-indigo-500">*/}
                                        {/*        View full details*/}
                                        {/*    </a>*/}
                                        {/*</p>*/}
                                    </div>
                                    <div className="sm:col-span-8 lg:col-span-7">
                                        <h2 className="text-2xl font-montserrat font-semibold text-gray-900 sm:pr-12"
                                            ref={completeButtonRef}>{product.name}</h2>

                                        <section aria-labelledby="information-heading" className="mt-4">
                                            {/*<h3 id="information-heading" className="sr-only">*/}
                                            {/*    Product information*/}
                                            {/*</h3>*/}

                                            <div className="flex items-center">
                                                <div className="flex justify-between items-baseline text-lg text-gray-900 sm:text-xl">
                                                    ₽{selectedProduct.price}
                                                    {getItemQuantity(selectedProduct.productId)&&
                                                        <div className="text-gray-500 text-sm ml-1">
                                                             x{getItemQuantity(selectedProduct.productId)} шт
                                                        </div>
                                                    }
                                                </div>

                                                <div className="ml-4 pl-4 border-l border-gray-400">

                                                    <div className="flex items-center">
                                                        <div>
                                                            <img
                                                                src={storeImg.find(item => item.storeId === selectedProduct.storeId)?.src}
                                                                className="object-center object-scale-down h-6 w-20"/>
                                                        </div>
                                                        {/*<div className="flex items-center">*/}
                                                        {/*    {[0, 1, 2, 3, 4].map((rating) => (*/}
                                                        {/*        <StarIcon*/}
                                                        {/*            key={rating}*/}
                                                        {/*            className={classNames(*/}
                                                        {/*                1 > rating ? 'text-yellow-400' : 'text-gray-300',*/}
                                                        {/*                'h-5 w-5 flex-shrink-0'*/}
                                                        {/*            )}*/}
                                                        {/*            aria-hidden="true"*/}
                                                        {/*        />*/}
                                                        {/*    ))}*/}
                                                        {/*</div>*/}
                                                    </div>

                                                </div>

                                            </div>

                                            {/*<div className="mt-6 flex items-center">*/}
                                            {/*    <CheckIcon className="flex-shrink-0 w-5 h-5 text-green-500"*/}
                                            {/*               aria-hidden="true"/>*/}
                                            {/*    <p className="ml-2 font-medium text-gray-500">Есть в наличии</p>*/}
                                            {/*</div>*/}
                                            <div className="w-1/6 mt-6">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Количество
                                                </label>
                                                <select
                                                    className="mt-3 block w-full pl-3 pr-10 py-2 text-base border-gray-300 sm:text-sm rounded-md"
                                                    onChange={e => {
                                                        setQuantity(parseInt(e.target.value))
                                                    }}
                                                    value={quantity}
                                                >
                                                    {getCounts(10).map((item)=>(
                                                        <option value={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </section>

                                        <section aria-labelledby="options-heading" className="mt-5">
                                            <h3 id="options-heading" className="sr-only">
                                                Product options
                                            </h3>

                                            <form>
                                                <div>
                                                    {/*selected для отображения выбранного элемента, value prod для отрисовки каждого элемента*/}
                                                    <RadioGroup value={selectedProduct} onChange={setSelectedProduct}>
                                                        <RadioGroup.Label
                                                            className="block text-sm font-medium text-gray-700">
                                                            Магазины
                                                        </RadioGroup.Label>

                                                        <div className="mt-4 grid grid-cols-2 gap-3 ">
                                                            {product?.cartUnits?.map((prod) => (
                                                                <RadioGroup.Option
                                                                    as="div"
                                                                    key={prod.productId}
                                                                    value={prod}
                                                                    className={({active}) =>
                                                                        classNames(
                                                                            'relative flex justify-between items-center border border-gray-300 rounded-lg py-2 px-3.5 cursor-pointer focus:outline-none '
                                                                        )
                                                                    }
                                                                >
                                                                    {({active, checked}) => (
                                                                        <>
                                                                            <div>
                                                                                <img
                                                                                    src={storeImg.find(item => item.storeId === prod.storeId)?.src}
                                                                                    // className="object-center object-cover h-4"/>
                                                                                    className="object-center object-scale-down w-14"/>
                                                                                {/*поменять на 12 с 14,className="object-center object-scale-down h-4 w-14"/>*/}
                                                                                {/*{prod.storeId}*/}
                                                                            </div>

                                                                            {/*<RadioGroup.Label as="p"*/}
                                                                            {/*                  className="text-base font-medium text-gray-900">*/}
                                                                            {/*    {size.name}*/}
                                                                            {/*</RadioGroup.Label>*/}


                                                                            <RadioGroup.Description as="p"
                                                                                                    className="mt-1 text-sm text-gray-500">
                                                                                {prod.price} ₽
                                                                            </RadioGroup.Description>
                                                                            <div
                                                                                className={classNames(
                                                                                    // active ? 'border-1' : 'border-2',
                                                                                    checked ? 'border-green-600' : 'border-transparent',
                                                                                    'absolute -inset-px rounded-lg pointer-events-none border-2'
                                                                                )}
                                                                                aria-hidden="true"
                                                                            />
                                                                        </>
                                                                    )}
                                                                </RadioGroup.Option>
                                                            ))}

                                                            {/*{product.cartUnits?.map((prod) => (*/}
                                                            {/*    <RadioGroup.Option*/}
                                                            {/*        as="div"*/}
                                                            {/*        key={prod.storeId}*/}
                                                            {/*        value={prod}*/}
                                                            {/*        className={({active}) =>*/}
                                                            {/*            classNames(*/}
                                                            {/*                'relative flex justify-between border border-gray-300 rounded-lg p-3 cursor-pointer focus:outline-none '*/}
                                                            {/*            )*/}
                                                            {/*        }*/}
                                                            {/*    >*/}
                                                            {/*        {({active, checked}) => (*/}
                                                            {/*            <>*/}
                                                            {/*                <div>*/}
                                                            {/*                    /!*<img src={lentLogo}*!/*/}
                                                            {/*                    /!*     className="object-center object-cover h-7 "/>*!/*/}
                                                            {/*                    {prod.storeId}*/}
                                                            {/*                </div>*/}

                                                            {/*                /!*<RadioGroup.Label as="p"*!/*/}
                                                            {/*                /!*                  className="text-base font-medium text-gray-900">*!/*/}
                                                            {/*                /!*    {size.name}*!/*/}
                                                            {/*                /!*</RadioGroup.Label>*!/*/}


                                                            {/*                <RadioGroup.Description as="p"*/}
                                                            {/*                                        className="mt-1 text-sm text-gray-500">*/}
                                                            {/*                    {prod.price} ₽*/}
                                                            {/*                </RadioGroup.Description>*/}
                                                            {/*                <div*/}
                                                            {/*                    className={classNames(*/}
                                                            {/*                        // active ? 'border-1' : 'border-2',*/}
                                                            {/*                        checked ? 'border-green-600' : 'border-transparent',*/}
                                                            {/*                        'absolute -inset-px rounded-lg pointer-events-none border-2'*/}
                                                            {/*                    )}*/}
                                                            {/*                    aria-hidden="true"*/}
                                                            {/*                />*/}
                                                            {/*            </>*/}
                                                            {/*        )}*/}
                                                            {/*    </RadioGroup.Option>*/}
                                                            {/*))}*/}


                                                        </div>


                                                    </RadioGroup>
                                                </div>
                                                <div className="mt-4 flex">
                                                    <a href="#"
                                                       className="group flex text-sm text-gray-500 hover:text-gray-700">
                                                        {/*<span>What size should I buy?</span>*/}
                                                        <span>Как оформить заказ?</span>
                                                        <QuestionMarkCircleIcon
                                                            className="flex-shrink-0 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                    </a>
                                                </div>
                                                <div className="mt-6">
                                                    <button
                                                        // type="submit"
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            // setOpen(false)
                                                            dispatch(addToCart({
                                                                item: {
                                                                    id: selectedProduct.productId,
                                                                    count: quantity,
                                                                    storeId: selectedProduct.storeId
                                                                }
                                                            }))
                                                            setQuantity(1)
                                                            console.log(selectedProduct)
                                                        }}
                                                        className="w-full bg-green-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 "
                                                    >
                                                        Добавить в корзину
                                                    </button>
                                                </div>
                                                <div className="mt-6 text-center">
                                                    <a href="#" className="group inline-flex text-base font-medium">
                                                        <ShieldCheckIcon
                                                            className="flex-shrink-0 mr-2 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                                            aria-hidden="true"
                                                        />
                                                        {/*<span className="text-gray-500 group-hover:text-gray-700">Lifetime Guarantee</span>*/}
                                                        <span className="text-gray-500 group-hover:text-gray-700">Гарантия качества</span>
                                                    </a>
                                                </div>
                                            </form>
                                        </section>
                                    </div>


                                    {/*<div className="bg-gray-50 h-64 col-span-12">*/}
                                    {/*    <RadioGroup value={selectedSize} onChange={setSelectedSize}>*/}
                                    {/*        <RadioGroup.Label*/}
                                    {/*            className="block text-sm font-medium text-gray-700">*/}
                                    {/*            Магазины*/}
                                    {/*        </RadioGroup.Label>*/}

                                    {/*        <div className="mt-5 grid grid-cols-1 gap-4">*/}
                                    {/*            {product.cartUnits?.map((prod) => (*/}
                                    {/*                <RadioGroup.Option*/}
                                    {/*                    as="div"*/}
                                    {/*                    key={prod.storeId}*/}
                                    {/*                    value={prod}*/}
                                    {/*                    className={({active}) =>*/}
                                    {/*                        classNames(*/}
                                    {/*                            'relative flex justify-between border border-gray-300 rounded-lg p-3 cursor-pointer focus:outline-none '*/}
                                    {/*                        )*/}
                                    {/*                    }*/}
                                    {/*                >*/}
                                    {/*                    {({active, checked}) => (*/}
                                    {/*                        <>*/}
                                    {/*                            <div>*/}
                                    {/*                                /!*<img src={lentLogo}*!/*/}
                                    {/*                                /!*     className="object-center object-cover h-7 "/>*!/*/}
                                    {/*                                {prod.storeId}*/}
                                    {/*                            </div>*/}

                                    {/*                            /!*<RadioGroup.Label as="p"*!/*/}
                                    {/*                            /!*                  className="text-base font-medium text-gray-900">*!/*/}
                                    {/*                            /!*    {size.name}*!/*/}
                                    {/*                            /!*</RadioGroup.Label>*!/*/}


                                    {/*                            <RadioGroup.Description as="p"*/}
                                    {/*                                                    className="mt-1 text-sm text-gray-500">*/}
                                    {/*                                {prod.price} ₽*/}
                                    {/*                            </RadioGroup.Description>*/}
                                    {/*                            <div*/}
                                    {/*                                className={classNames(*/}
                                    {/*                                    // active ? 'border-1' : 'border-2',*/}
                                    {/*                                    checked ? 'border-green-600' : 'border-transparent',*/}
                                    {/*                                    'absolute -inset-px rounded-lg pointer-events-none border-2'*/}
                                    {/*                                )}*/}
                                    {/*                                aria-hidden="true"*/}
                                    {/*                            />*/}
                                    {/*                        </>*/}
                                    {/*                    )}*/}
                                    {/*                </RadioGroup.Option>*/}
                                    {/*            ))}*/}
                                    {/*        </div>*/}


                                    {/*    </RadioGroup>*/}
                                    {/*</div>*/}


                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
