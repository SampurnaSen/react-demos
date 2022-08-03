import { useState } from 'react';

function ButtonCounter() {
    const [count, setCount ] = useState(0)
    console.log(count)
    return (
        <div>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>
            <p>You clicked {count} times</p>
        </div>
    )
}

export default ButtonCounter