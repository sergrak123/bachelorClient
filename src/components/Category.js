import React, {useState} from 'react';


/* This example requires Tailwind CSS v2.0+ */
const navigation = [
    { name: 'Все категории', value: 'all', current: false },
    { name: 'Напитки', value: 'drink', current: false },
    { name: 'Фрукты', value: 'фрукты', current: false },
    { name: 'Сладкое', value: '', current: false },
    { name: 'Бакалея', value: '', current: false },
    { name: 'Снеки', value: '', current: false },
    { name: 'Ягоды', value: '', current: false },
    { name: 'Орехи', value: '', current: false },
    { name: 'Овощи', value: '', current: false },

]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Category({category,setCategory, setPage}) {

    const [value, setValue] = useState("");
    return (
        <nav className="space-y-1 pt-5 pl-5 cursor-pointer">
            {navigation.map((item) => (
                <a
                    key={item.name}
                    onClick={()=> {
                        setCategory(item.value)
                        setPage(0)
                    }}
                    className={classNames(
                        item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'flex items-center px-3 py-2 text-m font-medium rounded-md'
                    )}
                    // aria-current={item.current ? 'page' : undefined}
                >
                    <span className="truncate">{item.name}</span>
                </a>
            ))}
        </nav>
    )
}
