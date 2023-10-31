"use client"

import { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { useCookies } from 'next-client-cookies';

const App = () => {
    const cookies = useCookies();

    const [ remeber, setRemeber ] = useState(true);
    const [ error, setError ] = useState<string>();
    const [ loading, setLoading ] = useState(false);
    
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const email = typeof window !== undefined ? window.localStorage.getItem("email") : null; 

    useEffect(() => {
        if(email && emailRef.current) emailRef.current.value = email;
    }, []);

    async function handleClick() {
        if(remeber && emailRef.current) window.localStorage.setItem("email", emailRef.current.value);

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value

        try {
            setLoading(true);
            
            const { data } = await axios.post("/api/auth/signin", JSON.stringify({
                email, password
            }), { headers: {
                "Content-Type": "application/json"
            }});

            cookies.set("auth", data);

            window.location.href = "/app/home";
        } catch (error) {
            if(error instanceof AxiosError) setError(error.response?.data.message)
        }

        setLoading(false);
    }

    return (
        <main className="w-full h-screen flex items-center justify-center bg-zinc-50">
            <div className="w-96 h-96 bg-white flex flex-col items-center justify-center gap-4 shadow-lg rounded-xl">
                <input onFocus={() => setError(undefined)} ref={emailRef} type="email" placeholder="Email" className="bg-zinc-100 rounded-lg p-2 px-3"/>
                <input onFocus={() => setError(undefined)} ref={passwordRef} type="password" placeholder="Senha" className="bg-zinc-100 rounded-lg p-2 px-3"/>

                { error && <p className="text-red-500 font-medium text-center">{ error }</p> }

                <button disabled={loading} className="active:translate-y-[1px] bg-black text-white px-10 py-2 rounded-lg" onClick={handleClick}>Entrar</button>
            </div>
        </main>
    );
}
 
export default App;