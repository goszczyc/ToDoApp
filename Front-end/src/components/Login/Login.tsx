import { FormEvent } from "react";
import apiRequest from "../../misc/apiRequest";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);

        const result = await apiRequest("api/users/login", {
            method: "POST",
            body: formData,
        });

        if (!result.ok) {
            // TODO nie wiem co tu zrobić chyba wyjebać error jak się nie zaloguje? XD
        }

        const data = await result.json();

        if (data.data.user) {
            sessionStorage.setItem("user", data.data.user);
            navigate("/");
        }
    }

    return (
        <div className="flex flex-col items-center">
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
            <p className="mt-6 text-lg">
                Don't have an account?{" "}
                <Link
                    to={"/sign-up"}
                    className="text-mblue hover:text-dblue transition-colors focus:text-dblue"
                >
                    Sign up
                </Link>{" "}
                to get started!
            </p>
        </div>
    );
}

export default Login;
