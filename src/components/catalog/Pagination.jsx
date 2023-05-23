//import {ArrowNarrowLeftIcon, ArrowNarrowRightIcon} from '@heroicons/react/solid'
//import {useState} from "react";
import {getPagesArray} from "../../utils/pages";

export default function Pagination({page, setPage,totalPage}) {

    let pagesArray = getPagesArray(totalPage)

    return (
        <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
            <div className="-mt-px w-0 flex-1 flex">
                {/*<a*/}
                {/*    href="#"*/}
                {/*    className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"*/}
                {/*>*/}
                {/*    <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />*/}
                {/*    Назад*/}
                {/*</a>*/}
            </div>
            <div className="hidden md:-mt-px md:flex cursor-pointer">
                {pagesArray.map(p => (
                    <a
                        key={p}
                        onClick={() => {
                            setPage(p)
                        }}
                        className={p === page
                            ? "border-gray-900 text-gray-900 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"}>
                        {p + 1}
                    </a>
                ))}
            </div>

            <div className="-mt-px w-0 flex-1 flex justify-end">
                {/*<a*/}
                {/*    href="#"*/}
                {/*    className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"*/}
                {/*>*/}
                {/*    Вперед*/}
                {/*    <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />*/}
                {/*</a>*/}
            </div>
        </nav>
    )
}
