import {Fragment, useContext} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {SearchIcon} from '@heroicons/react/solid'
import {ShoppingCartIcon, LockClosedIcon} from '@heroicons/react/outline'

import {AuthContext} from "../context";
import {Link, useLocation, useNavigate} from "react-router-dom";
import React from 'react';

const user = {
    name: 'Grak Sergey',
    email: 'sergey@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavigationBar() {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const location = useLocation();
    const router = useNavigate()

    const logout = () => {
        setIsAuth(false)
        localStorage.removeItem("auth")
        localStorage.removeItem("authInfo")
    }

    const userNavigation = [
        {name: 'История заказов', action: () => router("/orders")},
        {name: 'Профиль', href: '#'},
        {name: 'Выйти', href: '', action: logout},
    ]
    return (
        <div className="w-full bg-[#00693E]">

            <div className="max-w-10xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8">
                <div className="relative h-16 {/*h-20*/} flex justify-between">
                    <div className="relative z-10 px-2 flex lg:px-0">
                        <div className="flex-shrink-0 flex items-center">
                            {/*<img*/}
                            {/*    className="block h-8 w-auto"*/}
                            {/*    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"*/}
                            {/*    alt="Workflow"*/}
                            {/*/>*/}
                            <Link to="/catalog">
                                <div
                                    className="text-white font-montserrat font-light text-2xl {/*font-normal*/}">FoodFinder
                                </div>
                            </Link>

                        </div>
                    </div>

                    {location.pathname === "/catalog" &&
                        <div
                            className="relative z-0 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0">
                            <div className="w-full sm:max-w-xs">
                                <label htmlFor="search" className="sr-only">
                                    Search
                                </label>
                                <div className="relative">
                                    <div
                                        className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                                        <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                    </div>
                                    <input
                                        id="search"
                                        name="search"
                                        className="block w-full bg-gray-700 border border-transparent rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 focus:placeholder-gray-500 sm:text-sm
                                    bg-white border-white ring-white text-gray-900 placeholder-gray-500"
                                        // placeholder="Search"
                                        placeholder="Поиск"
                                        type="search"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        </div>
                    }


                    {/*<div className="relative z-10 flex items-center lg:hidden">*/}
                    {/*    /!* Mobile menu button *!/*/}
                    {/*    <Disclosure.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">*/}
                    {/*        <span className="sr-only">Open menu</span>*/}
                    {/*        {open ? (*/}
                    {/*            <XIcon className="block h-6 w-6" aria-hidden="true" />*/}
                    {/*        ) : (*/}
                    {/*            <MenuIcon className="block h-6 w-6" aria-hidden="true" />*/}
                    {/*        )}*/}
                    {/*    </Disclosure.Button>*/}
                    {/*</div>*/}

                    <div className="relative z-10 ml-4 flex items-center">

                        <Link to="/cart">
                            <button
                                type="button"
                                className="flex-shrink-0 rounded-full p-1 text-gray-200 hover:text-white focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">View shopping cart</span>
                                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true"/>
                            </button>
                        </Link>

                        {isAuth
                            //Profile dropdown
                            ? <Menu as="div" className="flex-shrink-0 relative ml-4">
                                <div>
                                    <Menu.Button
                                        className="bg-gray-800 rounded-full flex text-sm text-white hover:outline-none hover:ring-1 hover:ring-offset-2 hover:ring-offset-gray-800 hover:ring-white">
                                        <span className="sr-only">Open user menu</span>
                                        <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt=""/>
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95">

                                    <Menu.Items
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none cursor-pointer">
                                        {userNavigation.map((item) => (
                                            <Menu.Item key={item.name}>
                                                {({active}) => (
                                                    <a
                                                        // href={item.href}
                                                        className={classNames(
                                                            active ? 'bg-gray-100' : '',
                                                            'block py-2 px-4 text-sm text-gray-700'
                                                        )}
                                                        onClick={() => {
                                                            item.action()
                                                        }}
                                                    >
                                                        {item.name}
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        ))}
                                    </Menu.Items>

                                </Transition>
                            </Menu>

                            : <Link to="/login">
                                <button
                                    type="button"
                                    className="inline-flex items-center px-4 py-2 ml-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-800 bg-gray-50 hover:bg-gray-100 ">
                                    <LockClosedIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true"/>
                                    Войти
                                </button>

                                {/*<button*/}
                                {/*    type="button"*/}
                                {/*    className="bg-gray-800 flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none  focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">*/}
                                {/*    Войти*/}
                                {/*</button>*/}
                            </Link>

                        }


                    </div>

                </div>
                {/*<nav className="hidden lg:py-2 lg:flex lg:space-x-8" aria-label="Global">*/}
                {/*    {navigation.map((item) => (*/}
                {/*        <a*/}
                {/*            key={item.name}*/}
                {/*            href={item.href}*/}
                {/*            className={classNames(*/}
                {/*                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',*/}
                {/*                'rounded-md py-2 px-3 inline-flex items-center text-sm font-medium'*/}
                {/*            )}*/}
                {/*            aria-current={item.current ? 'page' : undefined}*/}
                {/*        >*/}
                {/*            {item.name}*/}
                {/*        </a>*/}
                {/*    ))}*/}
                {/*</nav>*/}
            </div>

            {/*<Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">*/}
            {/*    /!*<div className="pt-2 pb-3 px-2 space-y-1">*!/*/}
            {/*    /!*    {navigation.map((item) => (*!/*/}
            {/*    /!*        <Disclosure.Button*!/*/}
            {/*    /!*            key={item.name}*!/*/}
            {/*    /!*            as="a"*!/*/}
            {/*    /!*            href={item.href}*!/*/}
            {/*    /!*            className={classNames(*!/*/}
            {/*    /!*                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',*!/*/}
            {/*    /!*                'block rounded-md py-2 px-3 text-base font-medium'*!/*/}
            {/*    /!*            )}*!/*/}
            {/*    /!*            aria-current={item.current ? 'page' : undefined}*!/*/}
            {/*    /!*        >*!/*/}
            {/*    /!*            {item.name}*!/*/}
            {/*    /!*        </Disclosure.Button>*!/*/}
            {/*    /!*    ))}*!/*/}
            {/*    /!*</div>*!/*/}
            {/*    <div className="border-t border-gray-700 pt-4 pb-3">*/}
            {/*        <div className="px-4 flex items-center">*/}
            {/*            <div className="flex-shrink-0">*/}
            {/*                <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />*/}
            {/*            </div>*/}
            {/*            <div className="ml-3">*/}
            {/*                <div className="text-base font-medium text-white">{user.name}</div>*/}
            {/*                <div className="text-sm font-medium text-gray-400">{user.email}</div>*/}
            {/*            </div>*/}
            {/*            <button*/}
            {/*                type="button"*/}
            {/*                className="ml-auto flex-shrink-0 bg-gray-800 rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"*/}
            {/*            >*/}
            {/*                <span className="sr-only">View notifications</span>*/}
            {/*                <BellIcon className="h-6 w-6" aria-hidden="true" />*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*        <div className="mt-3 px-2 space-y-1">*/}
            {/*            {userNavigation.map((item) => (*/}
            {/*                <Disclosure.Button*/}
            {/*                    key={item.name}*/}
            {/*                    as="a"*/}
            {/*                    href={item.href}*/}
            {/*                    className="block rounded-md py-2 px-3 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"*/}
            {/*                >*/}
            {/*                    {item.name}*/}
            {/*                </Disclosure.Button>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Disclosure.Panel>*/}
        </div>
    )
}
