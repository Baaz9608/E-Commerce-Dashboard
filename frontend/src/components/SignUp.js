import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'

const SignUp = ()=>{
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate()

    
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })

    const collectData = async()=>{
        // console.log(name, email, password);
        setName("");
        setEmail("");
        setPassword("");
        const result = await fetch('http://localhost:5000/register',{
            method:'post',
            body:JSON.stringify({name, email, password}),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        let data = await result.json();
        console.log(data)
        localStorage.setItem('user',JSON.stringify(data));
        if(data){
            navigate('/');
        }
    }
    return(
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" 
            type="text" 
            value={name}
            placeholder="Enter Name" 
            onChange={(e)=>setName(e.target.value)}/>

            <input className="inputBox" 
            type="email" 
            value={email}
            placeholder="Enter Email"
            onChange={(e)=>setEmail(e.target.value)}/>

            <input className="inputBox" 
            type="password" 
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>

            <button type="button"
            onClick={collectData} 
            className="appbtn">Sign Up</button>
        </div>
    )
}

export default SignUp;