import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import getConfig from '../utils/getConfig';



const RegistroContacto = () => {

    const [getTomador, setGetTomador] = useState([]);
    const [getUsuario, setGetUsuario] = useState([]);
    const [ dataMotivo1, setDataMotivo1 ] = useState("");
    const [ infoMotivo2, setInfoMotivo2 ] = useState([]);
    const [ dataMotivo2, setDataMotivo2 ] = useState("");
    const [ infoMotivo3, setInfoMotivo3 ] = useState([]);
    const { register, handleSubmit, reset } = useForm();


    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/tomador', getConfig())
            .then(res => setGetTomador(res.data))
    }, [])

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/users')
            .then(res => setGetUsuario(res.data))
    }, [])


    const registrarContacto = (data) => {
        axios.post(`https://atina-neb-production.up.railway.app/api/v1/contacto`, data, getConfig())
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

    // const optionsMotivo2 = dataMotivo1 === "Efectivo" ? ["Contactado", "No Interesado", "Volver a Llamar"] :
    //                         dataMotivo1 === "No Efectivo" ? ["No contesta", "Ocupado", "Contestadora"] :
    //                         dataMotivo1 === "No Localizable" ? ["Equivocado ", "Fuera de Servicio"] :
    //                         dataMotivo1 === "Descartado" ? ["Sin Número", "Número Errado"] : "";

    useEffect(() => {
        const optionsMotivo2 = dataMotivo1 === "Efectivo" ? setInfoMotivo2(["Contactado", "No Interesado", "Volver a Llamar"]) :
                            dataMotivo1 === "No Efectivo" ? setInfoMotivo2(["No contesta", "Ocupado", "Contestadora"]) :
                            dataMotivo1 === "No Localizable" ? setInfoMotivo2(["Equivocado", "Fuera de Servicio"]) :
                            dataMotivo1 === "Descartado" ? setInfoMotivo2(["Sin Número", "Número Errado"]) : "";

    }, [dataMotivo1])

    useEffect(() => {
        const optionsMotivo2 = dataMotivo2 === "Contactado" ? setInfoMotivo3(["Cita Efectiva", "Cotización Enviada", "Solicitud Envío de Información", "Confirmación de Suscripción"]) :
                            dataMotivo2 === "No Interesado" ? setInfoMotivo3(["Ya se encuentra asegurado", "No desea poliza", "Precios elevados", "No está de acuerdo con la cobertura"]) :
                            dataMotivo2 === "Volver a Llamar" ? setInfoMotivo3(["Volver a Llamar", "Confirma recepción de cotización", "En espera de aprobación", "Inconveniente de comunicación"]) :
                            dataMotivo2 === "No contesta" ? setInfoMotivo3(["No contesta"]) : 
                            dataMotivo2 === "Ocupado" ? setInfoMotivo3(["Ocupado"]) :
                            dataMotivo2 === "Contestadora" ? setInfoMotivo3(["Contestadora"]) :
                            dataMotivo2 === "Equivocado" ? setInfoMotivo3(["Equivocado "]) :
                            dataMotivo2 === "Fuera de Servicio" ? setInfoMotivo3(["Fuera de Servicio "]) :
                            dataMotivo2 === "Sin Número" ? setInfoMotivo3(["Sin Número"]) :
                            dataMotivo2 === "Número Errado" ? setInfoMotivo3(["Número Errado"]) : "";


    }, [dataMotivo2])

    console.log(infoMotivo3)



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
                                            <option value="Llamadas">Llamadas</option>
                                        </select>
                                    </div>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="telefono">proposito</label>
                                        <select name="pets" id="pet-select" {...register("proposito")}>
                                            <option value="">--Please choose an option--</option>
                                            <option value="Cita">Cita</option>
                                            <option value="Seguimiento">Seguimiento</option>
                                            <option value="Cotización">Cotización</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='contenedor3'>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="direccion">motivo1</label>
                                        <select name="pets" id="pet-select" {...register("motivo1")} onChange={e => setDataMotivo1(e.target.value)}>
                                            <option value="">--Please choose an option--</option>
                                            <option value="Efectivo">Efectivo</option>
                                            <option value="No Efectivo">No Efectivo</option>
                                            <option value="No Localizable">No Localizable</option>
                                            <option value="Descartado">Descartado</option>
                                        </select>
                                    </div>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="motivo2">motivo2</label>
                                        <select name="motivo2" placeholder='hola' {...register("motivo2")} onChange={e => setDataMotivo2(e.target.value)}>
                                            <option value="">--Please choose an option--</option>

                                            {
                                                infoMotivo2.map(test => (
                                                    <option value={test}>{test}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="fechatime">motivo3</label>
                                        <select name="pets" id="pet-select" {...register("motivo3")}>
                                            <option value="">--Please choose an option--</option>
                                            {
                                                infoMotivo3.map(test => (
                                                    <option value={test}>{test}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='contenedor3'>
                                    <div className='form-contac-detail'>
                                        <label htmlFor="fechatime">observacion</label>
                                        <textarea {...register("observacion")}></textarea>
                                    </div>
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