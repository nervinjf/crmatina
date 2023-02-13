import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Check from './Check';
import CheckNull from './CheckNull';
import AsyncSelect from 'react-select';
import getConfig from '../utils/getConfig';



const RegisterCitaC = ({ id, setRegisterCitaC, updateCita }) => {
    const [getUsuario, setGetUsuario] = useState([]);
    const { register, handleSubmit, reset } = useForm();
    const [isCheck, setIsCheck] = useState(false);
    const [isCheckNull, setIsCheckNull] = useState(false);
    const [infoPlan, setInfoPlan] = useState([]);
    const [infoTipo, setInfoTipo] = useState("");
    const [userSelected, setUserSelected] = useState(null);
    const [ idUser, setIdUser ] = useState("")


    const clear = () => {
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

    useEffect(() => {
        setIdUser(JSON.parse(localStorage.getItem("userData")));
    }, [])

    // -------------------------------------------------------
    const selectRegister = (updateCita) => {
        setUserSelected(updateCita)
    }

    useEffect(() => {
        if (updateCita) {
            reset(updateCita)
        }
    }, [updateCita]);

    // -----------------------------------------------------------------------------------------------

    const registrarDatosCitas = (data) => {
        if (updateCita) {
            // const dataPut = { "statusSuscripcion": data.statusSuscripcion }
            // console.log(data)
            axios.put(`https://atina-neb-production.up.railway.app/api/v1/cita/${data.id}/`, data, getConfig())
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

        } else {
            
            const data2 = ({ ...data, "tomadorId": id,  "userId": idUser.id});
            axios.post(`https://atina-neb-production.up.railway.app/api/v1/cita`, data2, getConfig())
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
        }
        clear()
    }

    // let options = getTomador.map(elemento => {
    //     const nombreCompleto = elemento.firstname + " " + elemento.lastname + " - " + elemento.ci;
    //     let item = {};
    //     item.value = elemento.id;
    //     item.label = nombreCompleto;

    //     return item;
    // });

    let value = 0;

    useEffect(() => {
        const optionsMotivo2 = infoTipo === "Salud" ? setInfoPlan(["Access - 5.000$", "Access - 10.000$", "Access - 20.000$", "Access - 30.000$",
        "Premium - 50.000$", "Premium - 100.000$", "Elite - 200.000$", "Póliza Integral - 1.000.000$"]) :
            infoTipo === "Mascotas" ? setInfoPlan(["Gold - 1.000$", "Platinum - 2.000$"]) : "";


    }, [infoTipo && userSelected]);

    useEffect(() => {
        axios.get('https://atina-neb-production.up.railway.app/api/v1/users')
            .then(res => setGetUsuario(res.data))
    }, [])

    return (
        <div className='blurcheck2'>
            {isCheck && <Check />}
            {isCheckNull && <CheckNull />}
            <div className='conatiner-check2'>
                <div className='check2'>
                    <div className='cancel-check2'>
                        <div>
                            <button onClick={() => setRegisterCitaC(false)}><i class="fa-solid fa-xmark"></i></button>
                        </div>

                    </div>
                    <div className='contain-Form-cita'>
                        <div className='form-cita'>
                            <form onSubmit={handleSubmit(registrarDatosCitas)}>
                                {/* <div>
                                    <AsyncSelect className='hola' id="id" placeholder="Tomador"  {...register("tomadorId")}
                                        options={options} value={options.find(c => c.value === value)} onChange={val => setGetTomadorId(val.value)}
                                    />
                                </div> */}
                                <div className='form--regis'>
                                    <div className='form-cot-cita-plani-regis'>
                                        <h3>Cotizacion</h3>
                                        <div className='form-cita-register'>
                                            <input type="text" placeholder='Codigo' value="10092" {...register("codigo")} />
                                            <div className='form-cita-register-cotizacion'>
                                                {/* <label htmlFor="tipo" placeholder='Tipo'>Tipo: </label> */}
                                                <select name="" id="" {...register("tipo")} onChange={(e) => setInfoTipo(e.target.value)}>
                                                    <option value="">--Seleccione tipo de Poliza--</option>
                                                    <option value="Salud">Salud</option>
                                                    <option value="Mascotas">Mascotas</option>
                                                </select>
                                            </div>
                                            <div className='form-cita-register-cotizacion'>
                                                {/* <label htmlFor="tipo" placeholder='Plan'>Plan: </label> */}
                                                <select name="" id="" {...register("plan")}>
                                                    <option value="">--Seleccione el Plan --</option>
                                                    {
                                                        infoPlan.map(item => (
                                                            <option value={item} key={item}>{item}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                            <input type="number" placeholder='Asegurados' {...register("asegurados")} />
                                            {/* <div className='form-cita-register-cotizacion'>
                                                <label htmlFor="Mpago" placeholder='metodo de Pago'>Moneda</label>
                                                <select name="Mpago" id="" {...register("efectivo")}>
                                                    <option value="">-- Seleccione el Tipo de Modeda --</option>
                                                    <option value="Dolares">Dolares</option>
                                                    <option value="Bolivares">Bolivares</option>
                                                </select>
                                            </div> 
                                             <div className='form-cita-register-cotizacion'>
                                                <label htmlFor="Mpago" placeholder='metodo de Pago'>Metodo de Pago</label>
                                                <select name="Mpago" id="" {...register("fPago")}>
                                                    <option value="">-- Seleccione el Metodo de Pago --</option>
                                                    <option value="Efectivo">Efectivo</option>
                                                    <option value="Transferencias">Transferencias</option>
                                                    <option value="Zinli">Zinli</option>
                                                    <option value="Debito">Debito</option>
                                                    <option value="Credito">Credito</option>
                                                </select>
                                            </div> */}
                                            <div className='form-cita-register-cotizacion'>
                                                {/* <label htmlFor="">Tiempo</label> */}
                                                <select name="" id="" {...register("tiempo")}>
                                                    <option value="">-- Seleccione el Tiempo --</option>
                                                    <option value="Mensual">Mensual</option>
                                                    <option value="Trimestral">Trimestral</option>
                                                    <option value="Semestral">Semestral</option>
                                                    <option value="Anual">Anual</option>
                                                </select>
                                            </div>
                                            <input type="text" placeholder='Monto Poliza' {...register("poliza")} />
                                            <div className='form-cita-register-cotizacion-check'>
                                                <label htmlFor="check">Envio de Cotización: </label>
                                                <input type="checkbox" {...register("enviaCotiza")} />
                                            </div>
                                            <input type="text" placeholder='Prima anual' {...register("primaAnual")} />

                                        </div>
                                    </div>
                                    <div className='form-cot-cita-plani-regis'>
                                        <h3>Cita</h3>
                                        <div className='cita-separate'>
                                            <div className='cita-separates'>
                                                <div className='form-cita-register-cotizacion'>
                                                    <label htmlFor="fechatime">Fecha Cita</label>
                                                    <input type="datetime-local" placeholder='Fecha' {...register("fecha")} />
                                                </div>
                                                <div className='form-cita-register-cotizacion'>
                                                    {/* <label htmlFor="">Tiempo</label> */}
                                                    <select name="" id="" {...register("statusSuscripcion")}>
                                                        {/* <option value="">-- Seleccione el modo de la cita --</option> */}
                                                        <option value="Proceso">Proceso</option>
                                                        <option value="Concluido">Concluido</option>
                                                        <option value="Concluido"></option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='cita-separates'>
                                                <div className='form-cita-register-cotizacion'>
                                                    {/* <label htmlFor="">Tiempo</label> */}
                                                    <select name="" id="" {...register("modoCita")}>
                                                        <option value="">-- Seleccione el modo de la cita --</option>
                                                        <option value="Virtual">Virtual</option>
                                                        <option value="Presencial">Presencial</option>
                                                    </select>
                                                </div>
                                                {/* <div className='form-cita-register-cotizacion'>
                                                    <label htmlFor="">Tiempo</label>
                                                    <select name="" id="" {...register("citaAcomp")}>
                                                        <option value="">-- Seleccione el modo de la cita --</option>
                                                        <option value="Solo">Solo</option>
                                                        <option value="Acompañado">Acompañado</option>
                                                    </select>
                                                </div> */}
                                            </div>
                                        </div>

                                    </div>
                                    <div className='form-cot-cita-plani-regis'>
                                        <h3>Planilla</h3>
                                        <div className='form-cita-register'>
                                            <div className='form-cita-register-cotizacion'>
                                                <label htmlFor="fechatime">Fecha Envio Cliente</label>
                                                <input type="date" placeholder='Fecha de cliente' {...register("fCliente")} />
                                            </div>
                                            <div className='form-cita-register-cotizacion'>
                                                <label htmlFor="fechatime">Fecha Devolucion</label>
                                                <input type="date" placeholder='fecha de devolucion' {...register("fDevolucion")} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className='user-form'>
                                    <select name="usuario" placeholder='Usuaios' {...register("userId")}>
                                        {
                                            getUsuario.map(user => (
                                                <option value={user.id} key={user.id}>{user.firstname} {user.lastname}</option>
                                            ))
                                        }
                                    </select>
                                </div> */}
                                <button>
                                    <div className='btn-text-hidden'>
                                        Enviar
                                    </div>

                                    <div className='btn-i-hidden'>
                                        <i class="fa-solid fa-circle-check"></i>
                                    </div>
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterCitaC;