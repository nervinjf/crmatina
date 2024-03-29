import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Check from './Check';
import CheckNull from './CheckNull';
import getConfig from '../utils/getConfig';


const Tomador = () => {

    const [getUsuario, setGetUsuario] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [isCheck, setIsCheck] = useState(false);
    const [isCheckNull, setIsCheckNull] = useState(false);
    const [ idUser, setIdUser ] = useState("")

    useEffect(() => {
        axios.get('http://crmatina.nebconnection.com/api/v1/users')
            .then(res => setGetUsuario(res.data))

            setIdUser(JSON.parse(localStorage.getItem("userData")));
    }, [])

    const registrarDatosTomador = (data) => {
        const data2 = {...data, "userId": idUser.id}
        axios.post(`http://crmatina.nebconnection.com/api/v1/tomador`, data2, getConfig())
        .catch(error => {
            console.log(error.response)
            if (error.response.status === 400) {
                setIsCheckNull(true)
                setTimeout(() => {
                    setIsCheckNull(false);
                }, "1500")
                setTimeout(() => {
                    setRegisterCitaC(false);
                }, "2000")
            }
        })
        .then(() => getUsers())
        .finally(() => {
            setIsCheck(true)
            setTimeout(() => {
                setIsCheck(false);
            }, "1500")
            setTimeout(() => {
                setRegisterCitaC(false);
            }, "2000")
        })
        reset({
            "firstname": "",
            "lastname": "",
            "ci": "",
            "email": "",
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
                                            <label htmlFor="telefono">CI</label>
                                            <input type="number" {...register("ci")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="correo">Email</label>
                                            <input type="email" {...register("email")} />
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
                                            <input type="date" {...register("fNacimiento")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Patologia</label>
                                            <input type="text" {...register("patologia")} />
                                        </div>
                                        <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Medicamentos</label>
                                            <input type="text" {...register("medicamentos")} />
                                        </div>
                                        {/* <div className='form-contac-detail'>
                                            <label htmlFor="fechatime">Usuario</label>
                                            <select name="nombre" {...register("userId")}>
                                                {
                                                    getUsuario.map(user => (
                                                        <option value={idUser.id} key={user.id}>{user.firstname} {user.lastname}</option>
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

export default Tomador;