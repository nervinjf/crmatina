import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Cita = () => {

    const [getTomador, setGetTomador] = useState([]);
    const [getUsuario, setGetUsuario] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/tomador')
            .then(res => setGetTomador(res.data))
    }, [])

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/users')
            .then(res => setGetUsuario(res.data))
    }, [])

    const registrarDatosCitas = (data) => {
        axios.post(`https://atina-neb-production.up.railway.app/api/v1/cita`, data)
            .catch(error => console.log(error.response))
            .then(() => getUsers())
        reset({
            "codigo": "",
            "fecha": "",
            "tipo": "",
            "plan": "",
            "asegurados": "",
            "fPago": "",
            "efectivo": "",
            "tiempo": "",
            "fCliente": "",
            "fDevolucion": "",
            "tomadorId": "",
            "poliza": "",
            "statusSuscripcion": "",
            "userId": ""
        })

    }

    return (
        <div>
            <div className='title-form'>
                <h1>Cita / Cotizacion</h1>
            </div>
            <div className='contain-Form'>
                <form onSubmit={handleSubmit(registrarDatosCitas)}>
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
                                                        <option value={Number(tomador.id)} key={tomador.id}>{tomador.firstname} {tomador.lastname}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="nombre">codigo</label>
                                            <input type="text" {...register("codigo")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="nombre">fecha</label>
                                            <input type="text" {...register("fecha")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="telefono">tipo</label>
                                            <input type="number" {...register("tipo")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="correo">plan</label>
                                            <input type="email" {...register("plan")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="correo">asegurados</label>
                                            <input type="text" {...register("asegurados")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="direccion">Forma de Pago</label>
                                            <input type="text" {...register("fPago")} />
                                        </div>
                                        
                                    </div>
                                    <div className='container-form-ase1'>
                                    <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">efectivo</label>
                                            <input type="text" {...register("efectivo")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">tiempo</label>
                                            <input type="text" {...register("tiempo")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Fecha Envio Cliente</label>
                                            <input type="text" {...register("fCliente")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Fecha Devolucion</label>
                                            <input type="text" {...register("fDevolucion")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">poliza</label>
                                            <input type="datetime-local" {...register("poliza")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Status Suscripcion</label>
                                            <input type="text" {...register("statusSuscripcion")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Usuario</label>
                                            <select name="nombre" {...register("userId")}>
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

export default Cita;