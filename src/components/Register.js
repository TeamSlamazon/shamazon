import React, { useState } from "react";
import { fetchRegister } from "../fetch";
import { Link } from 'react-router-dom';



const Register = (props) => {
    const {setUser} = props;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

return (
    <div className="registerdiv">
        <form onSubmit={ async (ev) =>  {
            
            try {
                ev.preventDefault();
                const res = await fetchRegister(username, password);
                console.log(res);
                const token = res.token
                if(!res.error) {
                    window.localStorage.setItem('token', token);
                    setMessage({message: 'Register was successful'})
                    setUser(res.user)
                    const redirHome = () => {
                        window.location.href ='/'
                    }
                    redirHome();

                }


        } catch (error){
            throw error
        }
    }}>
            <h1 className="registerheader">Create Your Account!</h1>
        <input className="registerinput" placeholder='username' value={username} onChange= {(ev) => {setUsername(ev.target.value)}}/>
        <input className="registerinput" placeholder='password' value={password} onChange= {(ev) => {setPassword(ev.target.value)}}/>


                <button className="register-btn" disabled={!username || !password}>Create Account</button>
            </form>
            <div>
                <nav className="login-text">
                    <Link to='/Login'>
                        Click here to login to your account!
                    </Link>
                </nav>
            </div>
        </div>
    )
}



export default Register