import React, { useState } from "react";

const SignUp = ()=>{
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const collectData = ()=>{
        console.log(name, email, password);
        setName("");
        setEmail("");
        setPassword("")
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