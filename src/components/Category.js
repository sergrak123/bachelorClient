import React from 'react';

/* This example requires Tailwind CSS v2.0+ */
const navigation = [
    { name: 'Напитки', href: '#', current: false },
    { name: 'Фрукты', href: '#', current: false },
    { name: 'Сладкое', href: '#', current: false },
    { name: 'Бакалея', href: '#', current: false },
    { name: 'Снеки', href: '#', current: false },
    { name: 'Ягоды', href: '#', current: false },
    { name: 'Орехи', href: '#', current: false },
    { name: 'Овощи', href: '#', current: false },
    { name: 'Ягоды', href: '#', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Category() {
    return (
        <nav className="space-y-1 pt-5 pl-5" aria-label="Sidebar">
            {navigation.map((item) => (
                <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                        item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'flex items-center px-3 py-2 text-m font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                >
                    <span className="truncate">{item.name}</span>
                </a>
            ))}
        </nav>
    )
}
