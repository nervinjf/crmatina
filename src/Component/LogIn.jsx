import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import  logos  from "../imagenes/NC_VersionPPAL_RGB.png"
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const LogIn = () => {

    const { register, handleSubmit, reset } = useForm();
    const [ user, setUser ] = useState(null);
    const navigate = useNavigate();

    // const singIn = () =>{

    // }


    const Login = (data) =>{
        axios.post("https://atina-neb-production.up.railway.app/api/v1/auth/login", data)
        // .then(res => JSON.parse(res))
        // .then(res => console.log(res.data))
        .then(res => {
            localStorage.setItem("userData", JSON.stringify(res.data))
            localStorage.setItem("token", JSON.stringify(res.data.token).replace('"', "").replace('"', ""))
            setUser(res.data)
            navigate("/")})
            .finally(reset({
                    "email": "",
                    "password": ""
                }))     
        .catch()   
    }
    return (
        <div className='container-login'>
            <div className='form-img'>   
                <img src={logos} alt="" width="200rem"/>
                <form action="" onSubmit={handleSubmit(Login)}>
                    <input type="text" placeholder='Email' {...register("email")}/>
                    <input type="password" name="" id="" placeholder='Password' {...register("password")}/>
                    <button>Ingresar</button>
                </form>
            </div>
        </div>
    );
};

export default LogIn;