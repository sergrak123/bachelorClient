import {Fragment, useEffect, useRef, useState} from 'react'
import {Dialog, RadioGroup, Transition} from '@headlessui/react'
import {XIcon} from '@heroicons/react/outline'
import {changeCount} from "../state";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const categories = [
    "Вода",
    "Напитки",
    "Кофе"
]

export default function AddingProduct({open, setOpen}) {
    let completeButtonRef = useRef(null)
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" initialFocus={completeButtonRef} className="fixed z-10 inset-0 overflow-y-auto"
                    onClose={() => {
                        setOpen(false)
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
                                <div className="absolute top-8 left-8 text-xl">
                                    Добавление продукта
                                </div>

                                <button
                                    type="button"
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                                    onClick={() => {
                                        setOpen(false)
                                    }}
                                >
                                    <XIcon className="h-6 w-6"/>
                                </button>

                                <div className="w-full">
                                    <div>
                                        <div>

                                            <div className="mt-10 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-5">
                                                <div>
                                                    <label htmlFor="first-name"
                                                           className="block text-sm font-medium text-gray-700">
                                                        Название
                                                    </label>
                                                    <div className="mt-3">
                                                        <input
                                                            type="text"
                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="category"
                                                           className="block text-sm font-medium text-gray-700">
                                                        Категория
                                                    </label>
                                                    <select
                                                        className="mt-3 block w-full pl-3 pr-10 py-2 text-base border-gray-300 sm:text-sm rounded-md focus:outline-none focus:ring-0 focus:border-gray-700"
                                                    >
                                                        {categories.map((item) => (
                                                            <option value={item} key={item}>{item}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div>
                                                    <label htmlFor="price"
                                                           className="block text-sm font-medium text-gray-700">
                                                        Стоимость
                                                    </label>
                                                    <div className="mt-3 relative rounded-md shadow-sm">
                                                        <div
                                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                            <span className="text-gray-500 sm:text-sm">₽</span>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            name="price"
                                                            id="price"
                                                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                                            placeholder="0.00"
                                                            aria-describedby="price-currency"
                                                        />

                                                    </div>
                                                </div>

                                                <div className="col-span-2">
                                                    <label htmlFor="first-name"
                                                           className="block text-sm font-medium text-gray-700">
                                                        Ссылка на изображение
                                                    </label>
                                                    <div className="mt-3 flex rounded-md shadow-sm">
                                                        <span
                                                            className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                                            https://
                                                        </span>
                                                        <input
                                                            type="text"
                                                            name="company-website"
                                                            id="company-website"
                                                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                                            placeholder="www.imgur.com/er3t"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="last-name"
                                                           className="block text-sm font-medium text-gray-700">
                                                        Объемно-весовая характеристика
                                                    </label>
                                                    <div className="mt-3 relative rounded-md shadow-sm">
                                                        <input
                                                            type="text"
                                                            className="focus:ring-0 focus:border-gray-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                                        />
                                                        <div className="absolute inset-y-0 right-0 flex items-center">
                                                            <select
                                                                className="focus:ring-0 focus:border-gray-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
                                                            >
                                                                <option>шт</option>
                                                                <option>мл</option>
                                                                <option>л</option>
                                                                <option>г</option>
                                                                <option>кг</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label htmlFor="price"
                                                           className="block text-sm font-medium text-gray-700">
                                                        Изготовитель
                                                    </label>
                                                    <div className="mt-3">
                                                        <input
                                                            type="text"
                                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="mt-6 border-t border-gray-200 pt-6">

                                            <div className="mt-3 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                                <div className="col-span-2">
                                                    <div className="flex justify-between">
                                                        <label
                                                            className="block text-sm font-medium text-gray-700">
                                                            Описание
                                                        </label>
                                                        <span className="text-sm text-gray-500">
                                                            Макс. 500 символов
                                                        </span>
                                                    </div>
                                                    <div className="mt-3">
                                                        <textarea
                                                            rows={4}
                                                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-7">
                                                <button
                                                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                    }}>
                                                    Добавить
                                                </button>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
