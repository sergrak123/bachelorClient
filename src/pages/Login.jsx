import React, {useContext, useState} from 'react';
import {AuthContext} from "../context";
import axios from "axios";
import {Link} from "react-router-dom";

function Login(){
    const {isAuth, setIsAuth, authInfo, setAuthInfo} = useContext(AuthContext)
    const [email, setEmail] = useState("sdsd@mail.ru")
    const [password, setPassword] = useState("12345")

    function login(data) {
        setIsAuth(true)
        setAuthInfo(data)
        localStorage.setItem("auth", "true")
        localStorage.setItem("authInfo", JSON.stringify(data));
    }

    async function checkAuth() {
        const url = "http://localhost:8080/user/auth";
        const response = await axios.get(url, {
            params: {
                email,
                password
            }
        })
        if(response.status === 200)
            login(response.data)
        else
            console.log("Ошибка авторизации")
    }

    return (
        // <div className="w-full h-full flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-2xl mt-28">
            <div className="flex justify-center mx-auto">
                {/*<img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>*/}
                {/*<h3 className="mt-3 text-xl font-medium text-center text-gray-600 ">Войти в аккаунт</h3>*/}
                <h3 className="mt-3 text-xl font-medium text-center text-gray-600 ">Войдите в аккаунт</h3>
            </div>

            <form className="mt-6">
                <div>
                    <label htmlFor="email"
                           className="block text-sm text-gray-800 ">Email</label>
                    <input type="email"
                           autoComplete="off"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        // required
                           className="border-gray-300 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>

                <div className="mt-4">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password"
                               className="block text-sm text-gray-800">Пароль</label>
                        {/*<a href="#" className="text-xs text-gray-600 dark:text-gray-400 hover:underline">Forget*/}
                        {/*    Password?</a>*/}
                    </div>

                    <input type="password"
                           autoComplete="off"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        // required
                           className="border-gray-300 block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                    <div className="text-red-400 mt-4">
                        Такой пользователь не существует
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                        onClick={(e) => {
                            e.preventDefault()
                            checkAuth()
                        }}>
                        {/*Sign In*/}
                        Войти
                    </button>
                </div>
            </form>
            <div className="flex justify-center items-baseline">
                <p className="mt-8 text-xs font-light text-center text-gray-400"> Еще нет аккаунта?

                </p>
                <Link to="/registration">
                    <div className="block font-medium text-gray-700 hover:underline ml-1 cursor-pointer"> Создать</div>
                </Link>

            </div>

        </div>
        // </div>

    );
};

export default Login;