import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Check from './Check';
import CheckNull from './CheckNull';

const RegisterUser = () => {

    const { register, handleSubmit, reset } = useForm();
    const [isCheck, setIsCheck] = useState(false);
    const [isCheckNull, setIsCheckNull] = useState(false);

    const registrarDatosTomador = (data) => {
        axios.post(`https://atina-neb-production.up.railway.app/api/v1/users`, data)
        .catch(error => {
            console.log(error.response)
            if (error.response.status === 400) {
                setIsCheckNull(true)
                setTimeout(() => {
                    setIsCheckNull(false);
                }, "3500")
            }
        })
        .finally(() => {
            setIsCheck(true)
            setTimeout(() => {
                setIsCheck(false);
            }, "3500")
        })
        reset({
            "firstname": "",
            "lastname": "",
            "email": "",
            "password": "",
        })

    }


    return (
        <div>
        <div>
            <h1>Tomador</h1>
            {isCheck && <Check />}
            {isCheckNull && <CheckNull />}
        </div>
        <div className='contain-Form'>
            <form onSubmit={handleSubmit(registrarDatosTomador)}>
                <div className='container-form-input'>
                    <div>
                        <div className='form-contac'>
                            <div className='container-form-ase'>
                                <div className='container-form-ase1'>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="nombre">Nombre</label>
                                        <input type="text" {...register("firstname")} />
                                    </div>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="nombre">Apellido</label>
                                        <input type="text" {...register("lastname")} />
                                    </div>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="correo">Email</label>
                                        <input type="email" {...register("email")} />
                                    </div>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="direccion">Contraseña</label>
                                        <input type="text" {...register("password")} />
                                    </div>
                                    {/* <div className='form-contac-detail'>
                                        <label htmlFor="fechatime">Usuario</label>
                                        <select name="nombre" {...register("userId")}>
                                            {
                                                getUsuario.map(user => (
                                                    <option value={Number(user.id)} key={user.id}>{user.firstname} {user.lastname}</option>
                                                ))
                                            }
                                        </select>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button>
                    <div className='btn-text-hidden'>
                        Submit
                    </div>

                    <div className='btn-i-hidden'>
                        <i class="fa-solid fa-circle-check"></i>
                    </div>
                </button>
            </form>
        </div>
    </div>
    );
};

export default RegisterUser;