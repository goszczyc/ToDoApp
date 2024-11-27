import { FormEvent, useEffect, useState } from "react";
import apiRequest from "../../misc/apiRequest";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../auth/auth";
import FormField from "../Util/FormField";

function SignUp() {
    const navigate = useNavigate();

    type FormField = "email" | "password" | "repeatPassword";

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const [isFormValid, setIsFormValid] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formValues, setFormValues] = useState<Record<FormField, string>>({
        email: "",
        password: "",
        repeatPassword: "",
    });
    const [formErrors, setFormErrors] = useState<Record<FormField, string>>({
        email: "",
        password: "",
        repeatPassword: "",
    });

    function handleChange(name: FormField, value: string) {
        setFormValues((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
        setIsSubmitting(true);
    }

    function validateField(name: FormField, value: string) {
        switch (name) {
            case "email":
                if (!value.match(EMAIL_REGEX)) {
                    return "Please enter a valid email address.";
                } else if (value === "") {
                    return "Email can't be empty.";
                }
                return "";
            case "password":
                if (!value.match(PASSWORD_REGEX)) {
                    return "Please enter a valid password (minimum 8 characters, one big letter, one special character)";
                }
                return "";
            case "repeatPassword":
                if (value !== formValues.password) {
                    return "Passwords do not match.";
                }
                return "";
            default:
                return "";
        }
    }

    // Debounce useEffect
    useEffect(() => {
        const timer = setTimeout(() => {
            const newErrors = Object.keys(formValues).reduce((errors, key) => {
                const field = key as FormField; // Type assertion
                const error = validateField(field, formValues[field]);
                return { ...errors, [field]: error };
            }, {} as Record<FormField, string>);
            setFormErrors(newErrors);
            setIsSubmitting(false);
        }, 500); // Adjust debounce time as needed

        return () => clearTimeout(timer);
    }, [formValues]);

    // Check overall form validity
    useEffect(() => {
        const hasErrors = Object.values(formErrors).some(
            (error) => error !== ""
        );
        const hasEmptyFields = Object.values(formValues).some(
            (value) => value === ""
        );
        setIsFormValid(!hasErrors && !hasEmptyFields);
    }, [formErrors, formValues]);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("email", formValues.email);
        formData.append("password", formValues.password);
        formData.append("repeatPassword", formValues.repeatPassword);

        if (formValues.password !== formValues.repeatPassword) {
            return;
        }

        try {
            const result = await apiRequest("api/users/signup", {
                method: "POST",
                body: formData,
            });
            
            const data = await result.json();
            
            if (data.data.user) {
                sessionStorage.setItem("user", data.data.user);
                navigate("/");
            }
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/");
        }
        return () => {};
    }, []);

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-1 items-center"
        >
            <h1 className="text-center font-bold text-lg">Zarejestruj się</h1>
            <FormField
                itemID="email"
                type="email"
                name="email"
                required={true}
                value={formValues.email}
                placeholder="your@email.com"
                validCondition={
                    formValues.email !== "" && formErrors.email !== ""
                }
                invalidMessage={"Invalid email"}
                onChange={(e) => handleChange("email", e.currentTarget.value)}
            />
            <FormField
                itemID="password"
                type="password"
                name="password"
                required={true}
                value={formValues.password}
                placeholder="password"
                validCondition={
                    formValues.password !== "" && formErrors.password !== ""
                }
                invalidMessage={
                    "Invalid password (must be at least 8 characters with at least one large Letter, number and special character"
                }
                onChange={(e) =>
                    handleChange("password", e.currentTarget.value)
                }
            />
            <FormField
                itemID="repeatPassword"
                type="password"
                name="repeatPassword"
                required={true}
                placeholder="Repeat password"
                value={formValues.repeatPassword}
                onChange={(e) =>
                    handleChange("repeatPassword", e.currentTarget.value)
                }
                validCondition={
                    formValues.repeatPassword !== "" &&
                    formErrors.repeatPassword !== ""
                }
                invalidMessage={"Dupsko"}
            />
            <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="bg-[#06A19D] border border-[#3b5958] rounded-md px-3 py-2 text-white font-bold w-fit self-center disabled:cursor-not-allowed disabled:opacity-85"
            >
                Zarejestruj się
            </button>
        </form>
    );
}

export default SignUp;
