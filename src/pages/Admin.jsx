import { Disclosure } from '@headlessui/react'
import { LockOpenIcon} from '@heroicons/react/outline'
import AdminProductList from "../components/AdminProductList";
import {storeImg} from "../utils/storeImages";
import AddingProduct from "../components/AddingProduct";
import {useState} from "react";


const navigation = [
    { name: 'Продукты', href: '#', current: true },
    { name: 'Заказы', href: '#', current: false }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Admin() {

    return (
        <>
            <div className="min-h-full bg-gray-100">

                <div className="bg-gray-800 pb-32">
                    <Disclosure as="nav" className="bg-gray-800">
                        {({ open }) => (
                            <>
                                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                    <div className="border-b border-gray-700">
                                        <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0">
                                                    <div className="pt-1 pl-6">
                                                        <img
                                                            src={storeImg()[0].src}
                                                            className="object-center object-scale-down w-28 rounded-lg"/>
                                                    </div>
                                                </div>
                                                <div className="hidden md:block">
                                                    <div className="ml-10 flex items-baseline space-x-4">
                                                        {navigation.map((item) => (
                                                            <a
                                                                key={item.name}
                                                                href={item.href}
                                                                className={classNames(
                                                                    item.current
                                                                        ? 'bg-gray-900 text-white'
                                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                                )}
                                                                aria-current={item.current ? 'page' : undefined}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="ml-4 flex items-center md:ml-6">
                                                    {/*<button
                                                        type="button"
                                                        className="bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                                    >
                                                        <span className="sr-only">View notifications</span>
                                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>*/}
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center px-4 py-2 ml-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-800 bg-gray-50 hover:bg-gray-100 ">
                                                        <LockOpenIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                                                        Выйти
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </Disclosure>
                    <header className="py-10">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {/*<h1 className="text-3xl font-bold text-white">Продукты</h1>*/}
                        </div>
                    </header>
                </div>

                <main className="-mt-32">
                    <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
                            <AdminProductList/>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
