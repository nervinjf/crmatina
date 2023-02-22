import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Check from './Check';
import CheckNull from './CheckNull';
import getConfig from '../utils/getConfig';



const RegisterContact = ({id, setRegisterContact}) => {

    const [getTomador, setGetTomador] = useState([]);
    const [getUsuario, setGetUsuario] = useState([]);
    const [ dataMotivo1, setDataMotivo1 ] = useState("");
    const [ infoMotivo2, setInfoMotivo2 ] = useState([]);
    const [ dataMotivo2, setDataMotivo2 ] = useState("");
    const [ infoMotivo3, setInfoMotivo3 ] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [isCheck, setIsCheck] = useState(false);
    const [isCheckNull, setIsCheckNull] = useState(false);
    const [ idUser, setIdUser ] = useState("")


    
    // const clear = () => {
    //     reset({
    //         "codigo": "",
    //         "fecha": "",
    //         "tipo": "",
    //         "plan": "",
    //         "asegurados": "",
    //         "fPago": "",
    //         "efectivo": "",
    //         "tiempo": "",
    //         "fCliente": "",
    //         "fDevolucion": "",
    //         "tomadorId": "",
    //         "poliza": "",
    //         "statusSuscripcion": "",
    //         "userId": ""
    //     })
    // }

    // const registrarDatosCitas = (data) => {
    //     if (userSelected) {
    //         const dataPut = { "statusSuscripcion": data.statusSuscripcion }
    //         console.log(data.id)
    //         axios.put(`http://crmatina.nebconnection.com/api/v1/cita/${data.id}/`, dataPut)
    //             .then(() => getUsers())

    //     } else {

    //         const data2 = ({ ...data, "tomadorId": id });
    //         axios.post(`http://crmatina.nebconnection.com/api/v1/cita`, data2)
    //             .catch(error => {
    //                 console.log(error.response)
    //                 if (error.response.status === 400) {
    //                     setIsCheckNull(true)
    //                     setTimeout(() => {
    //                         setIsCheckNull(false);
    //                     }, "3500")
    //                 }
    //             })
    //             .then(() => getUsers())
    //             .finally(() => {
    //                 setIsCheck(true)
    //                 setTimeout(() => {
    //                     setIsCheck(false);
    //                 }, "3500")
    //             })
    //     }
    //     clear()
    //     setRegisterContact(false)
    // }

    useEffect(() => {
        axios.get('http://crmatina.nebconnection.com/api/v1/users')
            .then(res => setGetUsuario(res.data))
            setIdUser(JSON.parse(localStorage.getItem("userData")));
    }, [])

    const registrarContacto = (data) => {
        const data2 = ({ ...data, "tomadorId": id, "userId": idUser.id});
        axios.post(`http://crmatina.nebconnection.com/api/v1/contacto`, data2, getConfig())
        .catch(error => {
                            console.log(error.response)
                            if (error.response.status === 400) {
                                setIsCheckNull(true)
                                setTimeout(() => {
                                    setIsCheckNull(false);
                                }, "1500")
                                setTimeout(() => {
                                    setRegisterContact(false);
                                }, "2000")
                            }
                        })
                        // .then(() => getUsers())
                        .finally(() => {
                            setIsCheck(true)
                            setTimeout(() => {
                                setIsCheck(false);
                            }, "1500")
                            setTimeout(() => {
                                setRegisterContact(false);
                            }, "2000")
                        })
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

    useEffect(() => {
        const optionsMotivo2 = dataMotivo1 === "Efectivo" ? setInfoMotivo2(["Contactado", "No Interesado", "Volver a Llamar"]) :
                            dataMotivo1 === "No Efectivo" ? setInfoMotivo2(["No contesta", "Ocupado", "Contestadora"]) :
                            dataMotivo1 === "No Localizable" ? setInfoMotivo2(["Equivocado", "Fuera de Servicio"]) :
                            dataMotivo1 === "Descartado" ? setInfoMotivo2(["Sin Número", "Número Errado"]) : "";

    }, [dataMotivo1])

    useEffect(() => {
        const optionsMotivo2 = dataMotivo2 === "Contactado" ? setInfoMotivo3(["Cita Efectiva", "Cotización Enviada", "Solicitud Envío de Información", "Confirmación de Suscripción", "Cotización Anulada",
                                                                              "Reprogramación de Cita", "Flayer Informativo", "Solicitud nueva información"]) :
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
        <div className='blurcheck2'>
            {isCheck && <Check />}
            {isCheckNull && <CheckNull />}
            <div className='conatiner-check2'>
                <div className='check'>
                <div className='cancel-check2'>
                        <div>
                            <button onClick={() => setRegisterContact(false)}><i class="fa-solid fa-xmark"></i></button>
                        </div>

                    </div>
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
                                            <option value="Información">Información</option>
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
        </div>
    );
};

export default RegisterContact;