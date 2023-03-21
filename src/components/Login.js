import React, { useState } from "react";

import { Link } from 'react-router-dom';

import { fetchLogin, getUser } from "../fetch";


const Login = ({ setUser }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    return (
        <div className="login-container">
            <div className="login-box">
                <form onSubmit={async (ev) => {
                    try {
                        ev.preventDefault();
                        const res = await fetchLogin(username, password);

                        if (!res.error) {
                            setUser(res.user)
                            const redirHome = () => {
                                window.location.href = '/#/'
                            }
                            redirHome();
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }}>
                    <div className="logininfo">
                        <h1 className="loginheader">Login To Your Account</h1>
                        <input classname="logcontainer" placeholder='username' value={username} onChange={(ev) => { setUsername(ev.target.value) }} />
                        <input classname="logcontainer" placeholder='password' value={password} onChange={(ev) => { setPassword(ev.target.value) }} />
                        <button className="login-btn" disabled={!username || !password}>Login</button>
                    </div>
                </form>
            </div>
            <nav className="login-text">
                <Link to='/Register'>
                    Don't have and account? Click here to register!
                </Link>
            </nav>
        </div>
    )


}

export default Login