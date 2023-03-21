import React, { useState } from "react";
import { fetchRegister } from "../fetch";
import { Link } from 'react-router-dom';



const Register = (props) => {
    const { setUser } = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    return (
        <div className="login-container">
            <div className="login-box">
                <form onSubmit={async (ev) => {
                    try {
                        ev.preventDefault();
                        const res = await fetchRegister(username, password);
                        const token = res.token
                        if (!res.error) {
                            window.localStorage.setItem('token', token);
                            setMessage({ message: 'Register was successful' })
                            setUser(res.user)
                            const redirHome = () => {
                                window.location.href = '/'
                            }
                            redirHome();
                        }
                    } catch (error) {
                        throw error
                    }
                }}>
                    <div className="logininfo">
                        <h1 className="loginheader">Create Your Account!</h1>
                        <input classname="logcontainer" placeholder='username' value={username} onChange={(ev) => { setUsername(ev.target.value) }} />
                        <input classname="logcontainer" placeholder='password' value={password} onChange={(ev) => { setPassword(ev.target.value) }} />
                        <button className="login-btn" disabled={!username || !password}>Register</button>
                    </div>
                </form>
            </div>
            <nav className="login-text">
                <Link to='/Login'>
                    Click here to login to your account!
                </Link>
            </nav>
        </div>
    )
}



export default Register