import React, {useContext, useState} from 'react';
import {AuthContext} from "../context";
import {Switch} from "@headlessui/react";

function Registration(props) {
    return (
        <div>
            <div className="w-full max-w-3xl p-6 m-auto mx-auto bg-white rounded-lg shadow-2xl mt-28">
                <div className="flex justify-center mx-auto">
                    {/*<img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>*/}
                    {/*<h3 className="mt-3 text-xl font-medium text-center text-gray-600 ">Войти в аккаунт</h3>*/}
                    <h3 className="mt-3 text-xl font-medium text-center text-gray-800 ">Регистрация покупателя</h3>
                </div>

                <div>
                    <div className="sm:col-span-2">
                        <div className="flex items-start justify-end">
                            <div className="ml-0 mr-4">
                            </div>
                            <div className="flex-shrink-0">

                            </div>
                        </div>
                    </div>
                    <div>


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

                        <div className="mt-7 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-5">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Имя
                                </label>
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Фамилия
                                </label>
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Пароль
                                </label>
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-0 focus:border-indigo-500 sm:text-sm"
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

                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-gray-200 pt-6">
                        <h2 className="text-lg font-medium text-gray-900">Адрес</h2>

                        <div className="mt-5 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                    Город
                                </label>
                                <div className="mt-3">
                                    <input
                                        type="text"
                                        className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm focus:ring-0 focus:border-indigo-500"

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

                                    />
                                </div>
                            </div>

                        </div>

                        <div className="mt-7">
                            <button
                                className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                                onClick={(e) => {
                                    e.preventDefault()

                                }}>
                                {/*Sign In*/}
                                Зарегистрироваться
                            </button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;