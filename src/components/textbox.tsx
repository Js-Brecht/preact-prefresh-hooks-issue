import { h, FunctionalComponent } from 'preact';
import { useState } from 'preact/hooks';

export const TextBox = () => {
    const [curInput, setInput] = useState('');

    // return (
    //     <input type="text" />
    // )

    return (
        <input type="text" value={curInput} onInput={(e) => setInput(e.currentTarget.value)} />
    )
}