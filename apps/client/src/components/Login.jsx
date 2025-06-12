import { useNavigate } from "react-router";
import "../styles/Login.css";
import { useRef } from "react";

export default function Login() {

    const userEmail = useRef();
    const userPassword = useRef();

    let navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();

        let data = {
            email: userEmail.current.value,
            password: userPassword.current.value
        };

        let response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/auth/login`,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }
        );

        let { token } = await response.json();
        
        if (token) {
            localStorage.setItem("token", token);
            navigate("/chat");
        }
    }

    return (
        <main id="login">
            <form className="login-form" onSubmit={loginUser}>
                <div className="login-form__title">
                    <h1 className="title-form">Login</h1>
                </div>
                <div className="login-form__input">
                    <label className="label-form" htmlFor="email">Email</label>
                    <input
                        id="email"
                        className="input-form"
                        type="email"
                        placeholder="user@mail.com"
                        ref={userEmail}
                    />
                </div>
                <div className="login-form__input">
                    <label className="label-form" htmlFor="password">Password</label>
                    <input 
                        id="password"
                        className="input-form"
                        type="password"
                        placeholder="•••••••"
                        ref={userPassword}
                    />
                </div>
                <button className="login-form__button">Sign In</button>
            </form>
        </main>
    );
}