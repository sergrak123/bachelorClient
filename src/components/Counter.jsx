import React, {useState} from 'react';


const Counter = () => {
    const [count, setCounts] = useState(0)

    function incr() {
        setCounts(count + 1)
    }

    function decr() {
        setCounts(count - 1)
    }
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={incr}>Increment</button>
            <button onClick={decr}>Decrement</button>
        </div>
    );
};

export default Counter;