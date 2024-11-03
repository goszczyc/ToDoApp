import { FormEvent, FormEventHandler, useState } from "react";

// TODO if response ok -> save user id, and secret key to session storage

function Login() {
    const [userInput, setUserInput] = useState({
        email: "",
        password: "",
    });
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const result = await fetch("http://127.0.0.1:5000/api/users/login", {
            method: "POST",
            body: formData,
        });

        if (!result.ok) {
            alert("CIPA");
        }

        const data = await result.json();

        if(data.user) {
            sessionStorage.setItem("user", data.user);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 items-center"
        >
            <h1 className="text-center font-bold text-lg">Zaloguj się</h1>
            <input
                itemID="email"
                type="email"
                name="email"
                className="py-2 px-4 text-lg min-w-30 max-w-52 bg-lblue border border-lblue border-solid rounded-md text-center"
                placeholder="email"
            />
            <input
                itemID="password"
                type="password"
                name="password"
                id="password"
                className="py-2 px-4 text-lg min-w-30 max-w-52 bg-lblue border border-lblue border-solid rounded-md text-center"
                placeholder="password"
            />
            <button
                type="submit"
                className="bg-[#06A19D] border border-[#3b5958] rounded-md px-3 py-2 text-white font-bold w-fit self-center"
            >
                Zaloguj się
            </button>
        </form>
    );
}

export default Login;
