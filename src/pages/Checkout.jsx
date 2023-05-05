import React, {useEffect, useState} from 'react';
import axios from "axios";

function Checkout(props) {
    const [cities, setCities] = useState([]);
    const [filterName, setFilterName] = useState("Моло");

    async function getCities() {
        const apiKey = "qo7X8MJqDy5xJALZK3qaC9uWAZmBLogE"
        const locale = "ru"
        const filterCity = 4335
        const url = "https://geohelper.info/api/v1/streets";
        const response = await axios.get(url, {
            params: {
                apiKey,
                "locale[lang]": locale,
                "filter[cityId]": filterCity,
                "filter[name]": filterName,
            }
        })
        console.log(response)
        console.log(response.data.result)
        setCities(response.data.result)
    }

    useEffect(() => {
        getCities()
    }, [filterName])


    return (
        <div className="flex justify-center">
            <div className="w-1/6 mt-6">
                <label className="block text-sm font-medium text-gray-700">
                    Улица
                </label>
                <select
                    className="mt-3 block w-full pl-3 pr-10 py-2 text-base border-gray-300 sm:text-sm rounded-md focus:outline-none focus:ring-0 focus:border-green-700"
                    value={filterName}
                >
                    {cities?.map((item) => (
                        <option value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Checkout;