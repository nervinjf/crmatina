import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { useForm } from 'react-hook-form';
import axios from 'axios';


const RegistroContacto = () => {

    const [getTomador, setGetTomador] = useState([]);
    const [getUsuario, setGetUsuario] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/tomador')
            .then(res => setGetTomador(res.data))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/users')
            .then(res => setGetUsuario(res.data))
    }, [])


    const registrarContacto = (data) => {
        axios.post(`http://localhost:8000/api/v1/contacto`, data)
            .catch(error => console.log(error.response))
            .then(() => getUsers())
        reset({
            "origen": "",
            "fuente": "",
            "proposito": "",
            "estatus": "",
            "motivo1": "",
            "motivo2": "",
            "motivo3": "",
            "observacion": "",
            "userId": "",
            "tomadorId": ""
        })

    }


    return (
        <div className='register-contact'>
            <div >
                <form onSubmit={handleSubmit(registrarContacto)}>
                    <div className='container-form-input'>
                        <div>
                            <div className='form-contacto'>
                                <div className='contenedor3'>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="nombre">origen</label>
                                        <select name="pets" id="pet-select" {...register("origen")}>
                                            <option value="">--Please choose an option--</option>
                                            <option value="Saliente">Saliente</option>
                                            <option value="Entrante">Entrante</option>
                                        </select>
                                    </div>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="nombre">fuente</label>
                                        <select name="pets" id="pet-select" {...register("fuente")}>
                                            <option value="">--Please choose an option--</option>
                                            <option value="WhatsApp">WhatsApp</option>
                                            <option value="Correo">Correo</option>
                                            <option value="Llamada">Llamada</option>
                                        </select>
                                    </div>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="telefono">proposito</label>
                                        <select name="pets" id="pet-select" {...register("proposito")}>
                                            <option value="">--Please choose an option--</option>
                                            <option value="Cita / Cotizacion">Cita / Cotizacion</option>
                                            <option value="??">??</option>
                                            <option value="??">??</option>
                                        </select>
                                    </div>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="correo">estatus</label>
                                        <input type="text" {...register("estatus")} />
                                    </div>
                                </div>
                                <div className='contenedor3'>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="direccion">motivo1</label>
                                        <input type="text" {...register("motivo1")} />
                                    </div>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="fechatime">motivo2</label>
                                        <input type="text" {...register("motivo2")} />
                                    </div>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="fechatime">motivo3</label>
                                        <input type="text" {...register("motivo3")} />
                                    </div>
                                </div>
                                <div className='contenedor3'>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="fechatime">observacion</label>
                                        <textarea {...register("observacion")}></textarea>
                                    </div>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="fechatime">Tomador</label>
                                        <input type="text" {...register("tomadorId")} />
                                    </div>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="fechatime">Usuario</label>
                                        <input type="text" {...register("userId")} />
                                    </div>
                                </div>
                                <div className='contenedor3'>

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

export default RegistroContacto;