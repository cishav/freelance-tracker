import { useEffect, useRef, useState } from "react";

function useLocalStorage(key, defaultValue){
    const [value, setValue] = useState(defaultValue);
    const isLoaded = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem(key);
        if(saved){
            setValue(JSON.parse(saved));
        }
        isLoaded.current = true;
    }, []);

    useEffect(() => {
        if(isLoaded.current){
            localStorage.setItem(key, JSON.stringify(value));
        }
    }, [value, key]);

    return [value, setValue];
}

export default useLocalStorage;