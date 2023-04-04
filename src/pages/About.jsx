import React, {useState} from 'react';
import axios from "axios";

const About = () => {

    const [products, setProducts] = useState([]);

    async function getResponse() {
        const response = await axios.get("http://192.168.1.67:8080/products")
        console.log(response)
        setProducts(response.data)
    }

    return (
        <div>
            <h1>Информация</h1>
            <div>
                {/*<input*/}
                {/*    type="text"*/}
                {/*    placeholder="Promt"*/}
                {/*    value={value}*/}
                {/*    onChange={event => setValue(event.target.value)}*/}
                {/*/>*/}
                <button onClick={getResponse}>Создать запрос</button>
                <div>{products.map(prod => <div>
                    <h1>{prod.price}</h1>
                </div>)}</div>
            </div>
        </div>
    );
};

export default About;