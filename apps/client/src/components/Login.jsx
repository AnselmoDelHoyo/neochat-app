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
            "http://localhost:8080/api/auth/login",
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
                    <label className="label-form">Email</label>
                    <input
                        className="input-form"
                        type="email"
                        placeholder="test1@gmail.com"
                        ref={userEmail}
                    />
                </div>
                <div className="login-form__input">
                    <label className="label-form">Password</label>
                    <input 
                        className="input-form"
                        type="password"
                        placeholder="•••••••"
                        ref={userPassword}
                    />
                </div>
                <button>Sign In</button>
            </form>
        </main>
    );
}