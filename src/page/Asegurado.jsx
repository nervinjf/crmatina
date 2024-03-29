import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import getConfig from '../utils/getConfig';

const Asegurado = () => {

    const [getTomador, setGetTomador] = useState([]);
    const [getUsuario, setGetUsuario] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        axios.get('http://crmatina.nebconnection.com/api/v1/tomador',  getConfig())
            .then(res => setGetTomador(res.data))
    }, [])

    useEffect(() => {
        axios.get('http://crmatina.nebconnection.com/api/v1/users',  getConfig())
            .then(res => setGetUsuario(res.data))
    }, [])

    const registrarDatosAsegurados = (data) => {
        axios.post(`http://crmatina.nebconnection.com/api/v1/asegurado`, data, getConfig())
            .catch(error => console.log(error.response))
            .then(() => getUsers())
        reset({
            "firstname": "",
            "lastname": "",
            "ci": "",
            "email": "",
            "parentesco": "",
            "phone1": "",
            "phone2": "",
            "phone3": "",
            "address1": "",
            "address2": "",
            "fNacimiento": "",
            "patologia": "",
            "medicamentos": "",
        })

    }

   

    return (
        <div>
            <div>
                <h1>Asegurado</h1>
            </div>
            <div className='contain-Form'>
                <form onSubmit={handleSubmit(registrarDatosAsegurados)}>
                    <div className='container-form-input'>
                        <div>
                            <div className='form-contac'>
                                <div className='container-form-ase'>
                                    <div className='container-form-ase1'>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="nombre">Tomador</label>
                                            <select name="nombre" {...register("tomadorId")}>
                                                {
                                                    getTomador.map(tomador => (
                                                        <option value={tomador.id} key={tomador.id}>{tomador.firstname} {tomador.lastname}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="nombre">Nombre</label>
                                            <input type="text" {...register("firstname")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="nombre">Apellido</label>
                                            <input type="text" {...register("lastname")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="telefono">CI</label>
                                            <input type="number" {...register("ci")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="correo">Email</label>
                                            <input type="email" {...register("email")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="correo">Parentesco</label>
                                            <input type="text" {...register("parentesco")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="direccion">Phone</label>
                                            <input type="text" {...register("phone1")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Phone2</label>
                                            <input type="text" {...register("phone2")} />
                                        </div>
                                    </div>
                                    <div className='container-form-ase1'>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Phone3</label>
                                            <input type="text" {...register("phone3")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Direccion</label>
                                            <input type="text" {...register("address1")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Direccion2</label>
                                            <input type="text" {...register("address2")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Fecha Nacimiento</label>
                                            <input type="datetime-local" {...register("fNacimiento")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Patologia</label>
                                            <input type="text" {...register("patologia")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Medicamentos</label>
                                            <input type="text" {...register("medicamentos")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Usuario</label>
                                            <select name="nombre" {...register("user_id")}>
                                                {
                                                    getUsuario.map(user => (
                                                        <option value={Number(user.id)} key={user.id}>{user.firstname} {user.lastname}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
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

export default Asegurado;