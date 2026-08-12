import { createContext, useCallback, useRef, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }){
    const [message, setMessage] = useState(null);
    const timerRef = useRef(null);

    const showToast = useCallback((text) => {
        setMessage(text);

        if(timerRef.current){
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            setMessage(null);
        }, 3000); 
    }, []);

    return (
        <ToastContext.Provider value={{ message, showToast }}>
            {children}
        </ToastContext.Provider>
    )
}

export default ToastContext;